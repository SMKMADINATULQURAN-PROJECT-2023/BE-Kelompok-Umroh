import { HttpStatus } from '@nestjs/common/enums';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';

import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';

import { PageRequestDto } from 'src/utils/dto/page.dto';
import { Action } from './entity/action.entity';
import { CreateActionDto, UpdateActionDto } from './dto/action.dto';

@Injectable()
export class ActionService extends BaseResponse {
  constructor(
    @InjectRepository(Action) private readonly actionRepo: Repository<Action>,
  ) {
    super();
  }
  async create(payload: CreateActionDto): Promise<ResponseSuccess> {
    await this.actionRepo.save({
      ...payload,
      role_id: { id: payload.role_id },
    });
    return this._success('Berhasil Membuat Role');
  }

  async get(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.actionRepo.find({
      take: pageSize,
      skip: limit,
    });
    const total = await this.actionRepo.count();

    return this._pagination(
      'Berhasil Menemukan Role',
      result,
      total,
      page,
      pageSize,
    );
  }

  async update(id: number, payload: UpdateActionDto): Promise<ResponseSuccess> {
    const check = await this.actionRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    await this.actionRepo.save({
      ...payload,
      role_id: { id: payload.role_id },
      id: id,
    });
    return this._success('Berhasil Mengupdate Role');
  }

  async delete(id: number) {
    const check = await this.actionRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    await this.actionRepo.delete(id);
    return this._success('Berhasil Menghapus Role');
  }

  async detail(id: number): Promise<ResponseSuccess> {
    const check = await this.actionRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    return this._success('Berhasil Menemukan Detail Role', check);
  }
}
