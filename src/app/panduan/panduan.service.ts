import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreatePanduanDto, FindPanduanDto } from './dto/panduan.dto';
import { UpdatePanduanDto } from './dto/panduan.dto';
import BaseResponse from 'src/utils/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Panduan } from './entities/panduan.entity';
import { Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PanduanService extends BaseResponse {
  constructor(
    @InjectRepository(Panduan)
    private readonly panduanRepo: Repository<Panduan>,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }
  async create(
    payload: CreatePanduanDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    if (!file?.path) {
      throw new HttpException(
        'thumbnail Tidak Boleh Kosong',
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
        const { public_id, url } = await this.cloudinary.uploadImage(
          file,
          'pandaun',
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
    await this.panduanRepo.save(payload);
    return this._success('Berhasil Membuat Panduan');
  }

  async findAll(query: FindPanduanDto): Promise<ResponsePagination> {
    const {
      page,
      pageSize,
      limit,
      gender,
      kategori_panduan,
      status,
      keyword,
      created_by,
    } = query;
    const filterQuery = {};
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
          created_by: {
            username: Like(`%${keyword}%`),
          },
        },
      );
    } else {
      if (gender) {
        filterQuery['gender'] = Like(`${gender}`);
      }
      if (kategori_panduan) {
        filterQuery['kategori_panduan'] = Like(`${kategori_panduan}`);
      }
      if (created_by == 'saya') {
        filterQuery['created_by.id'] = created_by;
      }
      if (status) {
        filterQuery['status'] = Like(`%${status}%`);
      }
    }

    const [result, count] = await this.panduanRepo.findAndCount({
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
      'Berhasil Menemukan Panduan',
      result,
      count,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.panduanRepo.findOne({
      where: { id },
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
    });
    if (!result) {
      throw new HttpException(`Panduan Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    return this._success('Berhasil Menemukan Detail Panduan', result);
  }

  async update(
    id: number,
    payload: UpdatePanduanDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    const check = await this.panduanRepo.findOne({ where: { id } });
    if (!check) throw new NotFoundException('Panduan Tidak Ditemukan');

    const allowedMimetypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/webm',
    ];

    if (file) {
      if (allowedMimetypes.includes(file.mimetype)) {
        const { public_id, url } = await this.cloudinary.uploadImage(
          file,
          'panduan',
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
      payload.id_thumbnail = check.id_thumbnail;
      payload.thumbnail = check.thumbnail;
    }

    await this.panduanRepo.save({
      ...payload,
      id: id,
    });
    return this._success('Berhasil Mengupdate Panduan');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.panduanRepo.findOne({ where: { id } });
    if (!check) throw new NotFoundException('Panduan Tidak Ditemukan');

    await this.cloudinary.deleteImage(check.id_thumbnail);
    await this.panduanRepo.delete({ id });
    return this._success('Berhasil Menghapus Panduan');
  }
}
