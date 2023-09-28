import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePanduanDto, FindPanduanDto } from './dto/panduan.dto';
import { UpdatePanduanDto } from './dto/panduan.dto';
import BaseResponse from 'src/utils/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Panduan } from './entities/panduan.entity';
import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Injectable()
export class PanduanService extends BaseResponse {
  constructor(
    @InjectRepository(Panduan)
    private readonly panduanRepo: Repository<Panduan>,
  ) {
    super();
  }
  async create(payload: CreatePanduanDto): Promise<ResponseSuccess> {
    await this.panduanRepo.save(payload);
    return this._success('Berhasil Membuat Panduan');
  }

  async findAll(query: FindPanduanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, kategori } = query;
    const total = await this.panduanRepo.count();
    const result = await this.panduanRepo.find({
      where: { kategori: kategori },
      take: pageSize,
      skip: limit,
    });
    return this._pagination(
      'Berhasil Menemukan Panduan',
      result,
      total,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.panduanRepo.findOne({ where: { id: id } });
    if (!result) {
      throw new HttpException(
        `Panduan Dengan Id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this._success('Berhasil Menemukan Detail Panduan', result);
  }

  async update(
    id: number,
    payload: UpdatePanduanDto,
  ): Promise<ResponseSuccess> {
    return this._success('Berhasil Mengupdate Panduan');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    return this._success('Berhasil Menghapus Panduan');
  }
}
