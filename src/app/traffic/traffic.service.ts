import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Traffic } from './entity/traffic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';

import { REQUEST } from '@nestjs/core';

@Injectable()
export class TrafficService extends BaseResponse {
  constructor(
    @InjectRepository(Traffic)
    private readonly trafficRepo: Repository<Traffic>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  async create(): Promise<ResponseSuccess> {
    console.log(this.req);
    if (this.req?.headers && this.req?.headers['user-agent']) {
      await this.trafficRepo.save({
        user_agent: this.req?.headers['user-agent'],
        ip: this.req?.socket?.remoteAddress,
      });
      return this._success(null);
    } else {
      // Handle the case where req.headers or req.headers['user-agent'] is undefined
      throw new HttpException(
        'User-Agent header not found in the request.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async totalPengunjung(): Promise<ResponseSuccess> {
    const months = [
      'januari',
      'februari',
      'maret',
      'april',
      'mei',
      'juni',
      'juli',
      'agustus',
      'september',
      'oktober',
      'november',
      'desember',
    ];

    const total = await this.trafficRepo.count();
    const data = [];
    for (let i = 0; i < months.length; i++) {
      const count = await this.trafficRepo
        .createQueryBuilder()
        .where(`MONTH(created_at) = :month`, { month: i + 1 })
        .getCount();
      data.push({ [months[i]]: count });
    }
    return this._success('Berhasil', {
      total_pengunjung: total,
      data,
    });
  }
}
