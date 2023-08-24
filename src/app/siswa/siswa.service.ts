import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Between, Like, Repository } from 'typeorm';

import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import { Workbook } from 'exceljs';
import * as fs from 'fs';
import { Siswa } from './siswa.entity';
import {
  CreateSiswaArrayDto,
  UpdateSiswaDto,
  findAllSiswaDto,
  findCatatanDto,
} from './siswa.dto';
import { findAllCatatanDto } from '../catatan/catatan.dto';
@Injectable()
export class SiswaService extends BaseResponse {
  constructor(
    @InjectRepository(Siswa)
    private readonly siswaRepository: Repository<Siswa>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async createBulk(payload: CreateSiswaArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        payload.data.map(async (data) => {
          const dataSave = {
            ...data,

            created_by: {
              id: this.req.user.id,
            },
          };

          try {
            await this.siswaRepository.save(dataSave);

            berhasil += 1;
          } catch (err) {
            console.log('err', err);
            gagal += 1;
          }
        }),
      );

      return this._success(`Berhasil menyimpan ${berhasil} dan gagal ${gagal}`);
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(query: findAllSiswaDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_siswa } = query;

    const filterQuery: any = {};

    if (nama_siswa) {
      filterQuery.nama_siswa = Like(`%${nama_siswa}%`);
    }

    const total = await this.siswaRepository.count({
      where: filterQuery,
    });
    const result = await this.siswaRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by'],
      select: {
        id: true,
        nama_siswa: true,
        nisn: true,
        kelas: true,
        tempat_lahir: true,
        tanggal_lahir: true,
        jenis_kelamin: true,

        created_by: {
          id: true,
          username: true,
        },
        updated_by: {
          id: true,
          username: true,
        },
      },
      skip: limit,
      take: pageSize,
    });
    return this._pagination('OK', result, total, page, pageSize);
  }

  async update(id: number, payload: UpdateSiswaDto): Promise<ResponseSuccess> {
    const check = await this.siswaRepository.findOne({
      where: {
        id,
      },
    });

    if (!check)
      throw new NotFoundException(`Produk dengan id ${id} tidak ditemukan`);

    console.log('pay', payload);
    await this.siswaRepository.save({
      ...payload,
      id: id,
    });
    return this._success('Produk berhasil diperbaharui');
  }

  async importProduk(filename: string): Promise<ResponseSuccess> {
    const filePath = `public/uploads/${filename}`;
    const workbook = new Workbook();
    const result = await workbook.xlsx
      .readFile(filePath)
      .then(async (workbook) => {
        const ws = workbook.getWorksheet('Laporan');

        const siswaArray = [];

        ws.eachRow((row) => {
          const rowData = [];
          row.eachCell((cell) => {
            rowData.push(cell.value);
          });
          siswaArray.push(rowData);
        });

        siswaArray.shift();
        const payload = [];

        siswaArray.forEach((row) => {
          const siswa = {
            nama_siswa: row[1],
            nisn: row[2],
            kelas: row[3],
            tempat_lahir: row[4],
            tanggal_lahir: row[5],
            jenis_kelamin: row[6] === 'L' ? 'L' : 'P',
          };
          payload.push(siswa);
        });

        console.log('pay', payload);

        const response = await this.createBulk({
          data: payload,
        });

        fs.unlinkSync(filePath);
        return response;
      })
      .catch(() => {
        throw new HttpException('Ada Kesalahan', HttpStatus.BAD_GATEWAY);
      });

    return this._success(result.message);
    //
  }

  async findSiswaCatatan(
    id: number,
    query: findCatatanDto,
  ): Promise<ResponseSuccess> {
    const { ta_id } = query;
    const result = await this.siswaRepository.findOne({
      where: {
        id: id,
        catatan: {
          ta_id: ta_id,
        },
      },
      relations: ['catatan'],
      select: {
        id: true,
        nama_siswa: true,
        nisn: true,
        kelas: true,
        jenis_kelamin: true,

        catatan: {
          id: true,
          kategori: true,
          poin: true,
          keterangan: true,
          tanggal: true,
          ta_id: true,
        },
      },
    });

    return this._success('OK', result);
  }
}
