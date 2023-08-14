import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Between, Like, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import BaseResponse from 'src/utils/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Catatan } from './catatan.entity';
import { CreateCatatanDto, findAllCatatanDto } from './catatan.dto';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
@Injectable()
export class CatatanService extends BaseResponse {
  constructor(
    @InjectRepository(Catatan)
    private readonly catatanRepository: Repository<Catatan>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async create(payload: CreateCatatanDto): Promise<ResponseSuccess> {
    try {
      await this.catatanRepository.save(payload);

      return this._success('OK');
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(query: findAllCatatanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;

    const total = await this.catatanRepository.count();

    const result = await this.catatanRepository.find({
      relations: ['created_by', 'updated_by', 'siswa'],
      select: {
        id: true,
        kategori: true,
        poin: true,
        keterangan: true,
        tanggal: true,
        kelas: true,

        siswa: {
          id: true,
          nama_siswa: true,
        },
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },

      skip: limit,
      take: pageSize,
    });
    return this._pagination('OK', result, total, page, pageSize);
  }
}
