import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import BaseResponse from 'src/utils/response/base.response';
import { LokasiZiarah } from './entity/lokasi_ziarah.entity';
import { Like, Repository } from 'typeorm';
import {
  CreateZiarahDto,
  FindZiarahDto,
  UpdateZiarahDto,
} from './lokasi_ziarah.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Traffic } from '../traffic/entity/traffic.entity';
import { REQUEST } from '@nestjs/core';
const ALLOWEDMIMETYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/webm',
];
@Injectable()
export class LokasiZiarahService extends BaseResponse {
  constructor(
    @InjectRepository(LokasiZiarah)
    private readonly ziarahRepository: Repository<LokasiZiarah>,
    private cloudinary: CloudinaryService,
    @InjectRepository(Traffic)
    private readonly trafficRepo: Repository<Traffic>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }
  async create(
    payload: CreateZiarahDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    if (!file?.path) {
      throw new HttpException(
        'thumbnail Tidak Boleh Kosong',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file) {
      if (ALLOWEDMIMETYPES.includes(file.mimetype)) {
        const { public_id, url } = await this.cloudinary.uploadImage(
          file,
          'lokasi ziarah',
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
    await this.ziarahRepository.save(payload);
    return this._success('Berhasil Menambah Lokasi Ziarah');
  }

  async get(query: FindZiarahDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword, created_by, status } = query;
    const filterKeyword = [];
    const filterQuery = {};
    if (keyword) {
      filterKeyword.push(
        { name: Like(`%${keyword}%`) },
        { location: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
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

    const [result, count] = await this.ziarahRepository.findAndCount({
      where: keyword ? filterKeyword : filterQuery,
      skip: limit,
      take: pageSize,
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
      'Berhasil Menemukan Lokasi Ziarah',
      result,
      count,
      page,
      pageSize,
    );
  }

  async update(
    id: number,
    payload: UpdateZiarahDto,
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

    if (file) {
      if (ALLOWEDMIMETYPES.includes(file.mimetype)) {
        const { public_id, url } = await this.cloudinary.uploadImage(
          file,
          'lokasi ziarah',
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

    const updatedZiarah = await this.ziarahRepository.save({
      ...payload,
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

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.ziarahRepository.findOne({
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
      throw new HttpException(
        `Lokasi Ziarah Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    return this._success('Berhasil Menemukan Lokasi Ziarah', result);
  }
}
