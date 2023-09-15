import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface/response';

@Injectable()
export class RoleService extends BaseResponse {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {
    super();
  }
  async create(payload): Promise<ResponseSuccess> {
    for (const data of payload) {
      const { role_name, actions } = data;
      const role = this.roleRepo.create({ role_name, actions });
      await this.roleRepo.save(role);
    }
    return this._success('Berhasil Membuat Role');
  }
}
