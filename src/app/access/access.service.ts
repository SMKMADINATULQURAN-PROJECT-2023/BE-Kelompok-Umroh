import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Access } from './entity/access.entity';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { AccessDto, FindAccessDto } from './dto/access.dto';

@Injectable()
export class AccessService extends BaseResponse {
  constructor(
    @InjectRepository(Access) private readonly accessRepo: Repository<Access>,
  ) {
    super();
  }

  async create(payload: AccessDto): Promise<ResponseSuccess> {
    await this.accessRepo.save(payload);
    return this._success('Berhasil Membuat Access');
  }

  async find(query: FindAccessDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, name, keyword } = query;
    const filterKeyword = [];
    const filterQuery = {};
    if (keyword) {
      filterKeyword.push({ name: Like(`%${keyword}%`) });
    } else {
      if (name) {
        filterQuery['name'] = Like(`%${name}%`);
      }
    }
    const [result, count] = await this.accessRepo.findAndCount({
      where: keyword ? filterKeyword : filterQuery,
      take: pageSize,
      skip: limit,
    });

    return this._pagination(
      'Berhasil Menemukan Access',
      result,
      count,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.accessRepo.findOne({
      where: { id: id },
    });
    if (!result) throw new NotFoundException('Access Tidak Ditemukan');
    return this._success('Berhasil Menemukan Detail Access', result);
  }

  async update(id: number, payload: AccessDto): Promise<ResponseSuccess> {
    const result = await this.accessRepo.findOne({
      where: { id: id },
    });
    if (!result) throw new NotFoundException('Access Tidak Ditemukan');
    await this.accessRepo.save({
      ...payload,
      id: id,
    });
    return this._success('Berhasil Mengupdate Access');
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const result = await this.accessRepo.findOne({
      where: { id: id },
    });
    if (!result) throw new NotFoundException('Access Tidak Ditemukan');

    await this.accessRepo.delete(id);
    return this._success('Berhasil Menghapus Access');
  }
}
