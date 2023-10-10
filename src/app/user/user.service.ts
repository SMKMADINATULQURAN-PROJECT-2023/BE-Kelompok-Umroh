import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/entity/auth.entity';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Injectable()
export class UserService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {
    super();
  }

  async findAll(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.userRepo.find({
      take: pageSize,
      skip: limit,
    });
    const total = await this.userRepo.count();
    return this._pagination(
      'Berhasil Menemukan User',
      result,
      total,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const check = await this.userRepo.find({
      where: { id },
    });

    if (!check) throw new NotFoundException('User Tidak Ditemukan');

    return this._success('Berhasil Menemukan Detail User', check);
  }
}
