import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateArtikelDto, UpdateArtikelDto } from './dto/artikel.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { Artikel } from './entities/artikel.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ArtikelService extends BaseResponse {
  constructor(
    @InjectRepository(Artikel)
    private readonly artikelRepo: Repository<Artikel>,
    private cluodinary: CloudinaryService,
  ) {
    super();
  }
  async create(
    payload: CreateArtikelDto,
    file: Express.Multer.File,
    id: number,
  ): Promise<ResponseSuccess> {
    if (!file?.path) {
      throw new HttpException(
        'thumbnail should not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      file?.mimetype === 'image/jpeg' ||
      file?.mimetype === 'image/jpg' ||
      file?.mimetype === 'image/png'
    ) {
      const { url, public_id } = await this.cluodinary.uploadImage(
        file,
        'artikel',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }
    console.log('payload', { ...payload });
    await this.artikelRepo.save({
      ...payload,
      author: { id: id },
    });
    return this._success('Berhasil Menyimpan Artikel');
  }

  async findAll(query): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.artikelRepo.find({
      relations: ['author'],
      take: pageSize,
      skip: limit,
    });
    const total = await this.artikelRepo.count();
    return this._pagination(
      'Berhasil Menemukan Artikel',
      result,
      total,
      page,
      pageSize,
    );
  }
  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.artikelRepo.findOne({
      where: { id: id },
    });
    if (!result)
      throw new HttpException(
        `Aritkel Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    return this._success('Berhasil Menemukan Artikel', result);
  }

  async update(
    id: number,
    payload: UpdateArtikelDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    const check = await this.artikelRepo.findOne({
      where: { id: id },
    });
    if (file?.path === undefined) {
      payload.thumbnail = check.thumbnail;
      payload.id_thumbnail = check.id_thumbnail;
    }
    if (
      file?.mimetype === 'image/jpeg' ||
      file?.mimetype === 'image/jpg' ||
      file?.mimetype === 'image/png'
    ) {
      await this.cluodinary.deleteImage(check.id_thumbnail);
      const { url, public_id } = await this.cluodinary.uploadImage(
        file,
        'artikel',
      );
      payload.id_thumbnail = public_id;
      payload.thumbnail = url;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!check) {
      throw new HttpException(
        `Artikel Dengan id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.artikelRepo.save({
      ...payload,
      id: id,
    });
    return this._success('Berhasil Mengupdate Artikel');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.artikelRepo.findOne({
      where: { id },
    });
    if (!check) {
      throw new HttpException(
        `Artikel Dengan id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cluodinary.deleteImage(check.id_thumbnail);
    await this.artikelRepo.delete(id);
    return this._success('Berhasil Menghapus Artikel');
  }
}
