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
    console.log(this.req.ip);

    await this.trafficRepo.save({
      user_agent: this.req?.headers['user-agent'],
      ip: this.req?.ip,
      original_url: this.req?.originalUrl,
    });
    return this._success(null);
  }

  async totalPengunjung(url): Promise<ResponseSuccess> {
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

    const total = await this.trafficRepo.count({
      where: { original_url: url.url.toString() },
    });
    const data = [];
    for (let i = 0; i < months.length; i++) {
      const count = await this.trafficRepo
        .createQueryBuilder()
        .where(`MONTH(created_at) = :month AND original_url LIKE :url`, {
          month: i + 1,
          url: `%${url.url.toString()}%`,
        })
        .getCount();
      data.push({ [months[i]]: count });
    }
    return this._success('Berhasil', {
      total_pengunjung: total,
      data,
    });
  }
}
