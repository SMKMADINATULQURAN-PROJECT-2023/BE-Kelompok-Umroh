import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import BaseResponse from 'src/utils/response/base.response';
import { Galeri } from './entity/galeri.entity';
import { CreateGaleriDto, FindGaleriDto, UpdateGaleriDto } from './galery.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class GaleriService extends BaseResponse {
  constructor(
    @InjectRepository(Galeri)
    private readonly galeriRepository: Repository<Galeri>,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }

  async create(
    payload: CreateGaleriDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg'
    ) {
      const { public_id, url } = await this.cloudinary.uploadImage(
        file,
        'galeri',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
      await this.galeriRepository.save(payload);
      return this._success('Berhasil Menambah Galeri');
    }
  }

  async get(query: FindGaleriDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.galeriRepository.find({
      skip: limit,
      take: pageSize,
    });
    const total = await this.galeriRepository.count();
    return this._pagination(
      'Berhasil Menemukan Galeri',
      result,
      total,
      page,
      pageSize,
    );
  }

  async update(
    id: number,
    updateGaleriDto: UpdateGaleriDto,
  ): Promise<ResponseSuccess> {
    const check = await this.galeriRepository.findOne({
      where: {
        id,
      },
    });
    if (!check) {
      throw new HttpException(
        `Galeri Dengan id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.galeriRepository.save({ ...updateGaleriDto, id });
    return this._success('Berhasil Mengupadate Galeri');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.galeriRepository.findOne({
      where: {
        id,
      },
    });
    if (!check) {
      throw new HttpException(
        `Galeri Dengan id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.galeriRepository.delete(id);
    return this._success('Berhasil Menghapus Galeri ');
  }
}
