/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DzikirPagi } from './entity/dzikir_pagi.entity';
import { Repository } from 'typeorm';
import { DzikirPetang } from './entity/dzikir_petang.entity';
import BaseResponse from 'src/utils/response/base.response';
import { ResponseSuccess } from 'src/interface';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateDzikirPagiPetangArrayDto } from './dzikir_pagi_petang.dto';
import { PageRequestDto } from 'src/utils/dto/page.dto';
@Injectable()
export class DzikirPagiPetangService extends BaseResponse {
  constructor(
    @InjectRepository(DzikirPagi)
    private readonly dzikirPagiRepository: Repository<DzikirPagi>,
    @InjectRepository(DzikirPetang)
    private readonly dzikirPetangRepository: Repository<DzikirPetang>,
  ) {
    super();
  }
  async getDzikirPagi(query: PageRequestDto) {
    const { page, pageSize, limit } = query;

    const [result, count] = await this.dzikirPagiRepository.findAndCount({
      skip: limit,
      take: pageSize,
    });

    return this._pagination(
      'Berhasil Menemukan Dzikir Pagi',
      result,
      count,
      page,
      pageSize,
    );
  }

  async getDzikirPetang(query: PageRequestDto) {
    const { page, pageSize, limit } = query;

    const result = await this.dzikirPetangRepository.find({
      skip: limit,
      take: pageSize,
    });
    const total = await this.dzikirPetangRepository.count();

    return this._pagination(
      'Berhasil Menemukan Dzikir Pagi',
      result,
      total,
      page,
      pageSize,
    );
  }
}
