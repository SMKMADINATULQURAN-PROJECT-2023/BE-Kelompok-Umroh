import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateArtikelDto,
  FindArtikelDto,
  UpdateArtikelDto,
  UpdateStatusArtikelDto,
} from './dto/artikel.dto';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import BaseResponse from 'src/utils/response/base.response';
import { Artikel } from './entities/artikel.entity';
import { Repository, Like, Not } from 'typeorm';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class ArtikelService extends BaseResponse {
  constructor(
    @InjectRepository(Artikel)
    private readonly artikelRepo: Repository<Artikel>,
    private cluodinary: CloudinaryService,
    @Inject(REQUEST) private req,
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
    const allowedMimetypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/webm',
    ];

    if (file) {
      if (allowedMimetypes.includes(file.mimetype)) {
        const { public_id, url } = await this.cluodinary.uploadImage(
          file,
          'artikel',
        );
        payload.thumbnail = url;
        payload.id_thumbnail = public_id;
      } else {
        throw new HttpException(
          ' file harus berekstensi .jpg, .jpeg, .png',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.artikelRepo.save(payload);
    return this._success('Berhasil Menyimpan Artikel');
  }

  async findAll(query: FindArtikelDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword, created_by, status } = query;
    const filterKeyword = [];
    const filterQuery = {};

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
    } else {
      if (created_by == 'saya') {
        filterQuery['created_by.id'] = this.req.user.id;
      }
      if (status) {
        filterQuery['status'] = Like(`%${status}%`);
      }
    }

    const [result, count] = await this.artikelRepo.findAndCount({
      take: pageSize,
      skip: limit,
      where: keyword ? filterKeyword : filterQuery,
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
    const allowedMimetypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/webm',
    ];

    if (file) {
      if (allowedMimetypes.includes(file.mimetype)) {
        const { public_id, url } = await this.cluodinary.uploadImage(
          file,
          'artikel',
        );
        payload.thumbnail = url;
        payload.id_thumbnail = public_id;
      } else {
        throw new HttpException(
          ' file harus berekstensi .jpg, .jpeg, .png',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      payload.thumbnail = check.thumbnail;
      payload.id_thumbnail = check.id_thumbnail;
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

  async updateStatus(
    id: number,
    payload: UpdateStatusArtikelDto,
  ): Promise<ResponseSuccess> {
    const check = await this.artikelRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!check) throw new NotFoundException('Artikel Tidak Ditemukan');

    const verify = await this.artikelRepo.findOne({
      where: {
        id: id,
        created_by: Not(this.req.user.id),
      },
    });
    console.log(verify);
    if (verify)
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    await this.artikelRepo.save({ payload, id: id });
    return this._success('Berhasil Mengupdate Status Artikel');
  }
}
