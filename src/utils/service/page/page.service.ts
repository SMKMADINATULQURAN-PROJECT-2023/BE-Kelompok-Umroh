import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class PageService {
  async paginationPage(data, repository, opt: FindManyOptions = {}) {
    const { page = 1, pageSize = 10 } = data;

    const total = await repository.count(opt);
    opt.skip = Number(page) - 1 * pageSize;
  }
}
