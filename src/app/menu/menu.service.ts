import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Menu } from './entity/menu.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface';

@Injectable()
export class MenuService extends BaseResponse {
  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {
    super();
  }

  async create(): Promise<ResponseSuccess> {
    return this._success('Berhasil Membuat Menu');
  }
}
