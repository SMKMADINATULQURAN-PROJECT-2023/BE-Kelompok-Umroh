import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateArtikelDto,
  FindArtikelDto,
  UpdateArtikelDto,
} from './dto/artikel.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { Artikel } from './entities/artikel.entity';
import { Repository, Like } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Status } from 'src/interface/status.interface';

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

    await this.artikelRepo.save(payload);
    return this._success('Berhasil Menyimpan Artikel');
  }

  async findAll(query: FindArtikelDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword } = query;
    const filterKeyword = [];

    if (keyword) {
      filterKeyword.push(
        {
          title: Like(`%${keyword}%`),
        },
        {
          description: Like(`%${keyword}%`),
        },
        {
          source: Like(`%${keyword}%`),
        },
        {
          created_by: {
            username: Like(`%${keyword}%`),
          },
        },
      );
    }

    const [result, count] = await this.artikelRepo.findAndCount({
      take: pageSize,
      skip: limit,
      where: keyword && filterKeyword,
      select: {
        created_by: {
          id: true,
          avatar: true,
          username: true,
        },
        updated_by: {
          id: true,
          avatar: true,
          username: true,
        },
      },
      relations: ['created_by', 'updated_by'],
    });

    return this._pagination(
      'Berhasil Menemukan Artikel',
      result,
      count,
      page,
      pageSize,
    );
  }
  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.artikelRepo.findOne({
      where: { id: id },
      select: {
        created_by: {
          id: true,
          avatar: true,
          username: true,
        },
        updated_by: {
          id: true,
          avatar: true,
          username: true,
        },
      },
      relations: ['created_by', 'updated_by'],
    });
    if (!result)
      throw new HttpException(`Aritkel Tidak Ditemukan`, HttpStatus.NOT_FOUND);
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
    if (!check) {
      throw new HttpException(`Artikel Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    if (!file?.path) {
      payload.thumbnail = check.thumbnail;
      payload.id_thumbnail = check.id_thumbnail;
    } else if (
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
      throw new HttpException(`Artikel Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    await this.cluodinary.deleteImage(check.id_thumbnail);
    await this.artikelRepo.delete(id);
    return this._success('Berhasil Menghapus Artikel');
  }
}
