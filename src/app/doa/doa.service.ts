import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import {
  CreateDoaDto,
  CreateKategoriDto,
  UpdateDoaDto,
  UpdateKategoriDto,
} from './doa.dto';
import { Doa } from './entity/doa.entity';
import { KategoriDoa } from './entity/category_doa.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class DoaService extends BaseResponse {
  constructor(
    @InjectRepository(Doa) private readonly doaRepo: Repository<Doa>,
    @InjectRepository(KategoriDoa)
    private readonly kategoriRepo: Repository<KategoriDoa>,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }

  // ** Doa =================================
  async createDoa(payload: CreateDoaDto): Promise<ResponseSuccess> {
    const checkKategori = await this.kategoriRepo.findOne({
      where: {
        id: payload.kategori_id,
      },
    });
    if (!checkKategori)
      throw new NotFoundException('Kategori Doa Tidak Ditemukan');

    await this.doaRepo.save({
      ...payload,
      kategori_id: { id: payload.kategori_id },
    });

    return this._success('Berhasil Membuat Doa');
  }

  async getDoa(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.doaRepo.find({
      skip: limit,
      take: pageSize,
      relations: ['kategori_id'],
    });
    const total = await this.doaRepo.count();
    return this._pagination(
      'Berhasil Menemukan Doa',
      result,
      total,
      page,
      pageSize,
    );
  }

  async updateDoa(id: number, payload: UpdateDoaDto): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }

    await this.doaRepo.save({
      ...payload,
      kategori_id: { id: payload.kategori_id },
    });
    return this._success('Berhasil Mengupdate Doa');
  }

  async removeDoa(id: number): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    await this.doaRepo.delete(id);
    return this._success('Berhasil Menghapus Doa');
  }

  async detailDoa(id: number): Promise<ResponseSuccess> {
    const result = await this.doaRepo.findOne({
      where: { id: id },
    });
    if (!result)
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    return this._success('Berhasil Menemukan Doa', result);
  }

  // ** Kategori =================================
  async createKategori(payload: CreateKategoriDto, file: Express.Multer.File) {
    if (!file?.path) {
      throw new HttpException(
        'Thumbnail Tidak Boleh Kosong',
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
        'kategori doa',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.kategoriRepo.save(payload);
    return this._success('Berhasil Menyimpan Kategori Doa');
  }

  async getKategori(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.kategoriRepo.find({
      skip: limit,
      take: pageSize,
      relations: ['doa_id'],
    });
    const total = await this.kategoriRepo.count();
    return this._pagination(
      'Berhasil Menemukan Kategori Doa',
      result,
      total,
      page,
      pageSize,
    );
  }

  async updateKategori(
    id: number,
    payload: UpdateKategoriDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(`Kategori Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }

    if (file?.path === undefined) {
      payload.id_thumbnail = check.id_thumbnail;
      payload.thumbnail = check.thumbnail;
    } else if (
      file?.mimetype == 'image/png' ||
      file?.mimetype == 'image/jpeg' ||
      file?.mimetype == 'image/jpg'
    ) {
      await this.cloudinary.deleteImage(check.id_thumbnail);
      const { public_id, url } = await this.cloudinary.uploadImage(
        file,
        'kategori doa',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.kategoriRepo.save({
      ...payload,
      id,
    });
    return this._success('Berhasil Mengupdate Kategori');
  }

  async removeKategori(id: number): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `KategoriDoa Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cloudinary.deleteImage(check.id_thumbnail);
    await this.kategoriRepo.delete(id);
    return this._success('Berhasil Menghapus KategoriDoa');
  }

  async detailKategori(id: number): Promise<ResponseSuccess> {
    const result = await this.kategoriRepo.findOne({
      where: { id: id },
    });
    if (!result)
      throw new HttpException(
        `Kategori Doa Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    return this._success('Berhasil Menemukan Kategori Doa', result);
  }
}
