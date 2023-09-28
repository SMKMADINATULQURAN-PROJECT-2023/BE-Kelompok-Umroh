import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import {
  CreateDoaArrayDto,
  CreateKategoriDto,
  UpdateKategoriDoaDto,
} from './doa.dto';
import { Doa } from './entity/doa.entity';
import { KategoriDoa } from './entity/category_doa.entity';

@Injectable()
export class DoaService extends BaseResponse {
  constructor(
    @InjectRepository(Doa) private readonly doaRepo: Repository<Doa>,
    @InjectRepository(KategoriDoa)
    private readonly kategoriRepo: Repository<KategoriDoa>,
  ) {
    super();
  }

  async createDoa(createDoaDto: CreateDoaArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        createDoaDto.data.map(async (data) => {
          const dataSave = {
            ...data,
            kategori_id: { id: data.kategori_id },
          };
          try {
            await this.doaRepo.save(dataSave);
            berhasil += 1;
          } catch (error) {
            gagal += 1;
            console.log('Gagal =>', gagal);
          }
        }),
      );
      return this._success(
        `Berhasil Membuat Doa ${berhasil} dan gagal ${gagal}  `,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
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

  async createKategoriDoa(payload: CreateKategoriDto) {
    await this.kategoriRepo.save(payload);
    return this._success('Berhasil Menyimpan Kategori Doa');
  }

  async updateDoa(
    id: number,
    payload: UpdateKategoriDoaDto,
  ): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `Doa Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.doaRepo.save({
      ...payload,
      kategori_id: { id: payload.kategori_id },
      id,
    });
    return this._success('Berhasil Mengupdate Doa');
  }

  async updateKategori(
    id: number,
    payload: UpdateKategoriDoaDto,
  ): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `Kategori Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.kategoriRepo.save({
      ...payload,
      id,
    });
    return this._success('Berhasil Mengupdate Kategori');
  }

  async removeDoa(id: number): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `Doa Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.doaRepo.delete(id);
    return this._success('Berhasil Menghapus Doa');
  }

  async removeKategori(id: number): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `KategoriDoa Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.kategoriRepo.delete(id);
    return this._success('Berhasil Menghapus KategoriDoa');
  }
}
