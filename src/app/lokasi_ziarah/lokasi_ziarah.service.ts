import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { LokasiZiarah } from './entity/lokasi_ziarah.entity';
import { Like, Repository } from 'typeorm';
import {
  CreateZiarahDto,
  FindZiarahDto,
  UpdateZiarahDto,
} from './lokasi_ziarah.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class LokasiZiarahService extends BaseResponse {
  constructor(
    @InjectRepository(LokasiZiarah)
    private readonly ziarahRepository: Repository<LokasiZiarah>,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }
  async create(
    payload: CreateZiarahDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    if (!file?.path) {
      throw new HttpException(
        'thumbnail should not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      file?.mimetype === 'image/png' ||
      file?.mimetype === 'image/jpeg' ||
      file?.mimetype === 'image/jpg'
    ) {
      const { public_id, url } = await this.cloudinary.uploadImage(
        file,
        'lokasi ziarah',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.ziarahRepository.save(payload);
    return this._success('Berhasil Menambah Lokasi Ziarah');
  }

  async get(query: FindZiarahDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword } = query;
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        { name: Like(`%${keyword}%`) },
        { location: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      );
    }

    const result = await this.ziarahRepository.find({
      where: keyword ? filterKeyword : {},
      skip: limit,
      take: pageSize,
    });
    const total = await this.ziarahRepository.count();
    return this._pagination(
      'Berhasil Menemukan Lokasi Ziarah',
      result,
      total,
      page,
      pageSize,
    );
  }

  async update(
    id: number,
    updateZiarahDto: UpdateZiarahDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    const check = await this.ziarahRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!check) {
      throw new NotFoundException(`Lokasi Tidak Ditemukan`);
    }
    if (file?.path === undefined) {
      updateZiarahDto.id_thumbnail = check.id_thumbnail;
      updateZiarahDto.thumbnail = check.thumbnail;
    }
    if (
      file?.mimetype == 'image/png' ||
      file?.mimetype == 'image/jpeg' ||
      file?.mimetype == 'image/jpg'
    ) {
      await this.cloudinary.deleteImage(check.id_thumbnail);
      const { public_id, url } = await this.cloudinary.uploadImage(
        file,
        'lokasi ziarah',
      );
      updateZiarahDto.id_thumbnail = public_id;
      updateZiarahDto.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedZiarah = await this.ziarahRepository.save({
      ...updateZiarahDto,
      id: id,
    });

    return this._success('Berhasil Mengupdate Lokasi Ziarah', updatedZiarah);
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.ziarahRepository.findOne({
      where: { id },
    });
    if (!check) {
      throw new HttpException(
        `Lokasi Ziarah Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cloudinary.deleteImage(check.id_thumbnail);
    await this.ziarahRepository.delete(id);
    return this._success('Berhasil Menghapus Lokasi Ziarah');
  }
}
