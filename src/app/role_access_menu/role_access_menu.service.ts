import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { Role } from '../role/entity/role.entity';
import { Access } from '../access/entity/access.entity';
import { Menu } from '../menu/entity/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleAccessMenuService extends BaseResponse {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Access) private readonly accessRepo: Repository<Access>,
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {
    super();
  }

  async create(payload): Promise<ResponseSuccess> {
    const role = await this.roleRepo.findOne({
      where: { role_name: payload.role },
    });
    const access = await this.accessRepo.findOne({
      where: { name: payload.access },
    });
    if (!role || !access)
      throw new NotFoundException('Role Atau Access Tidak Ditemukan');
    const id = await this.menuRepo.save(payload);
    await this.accessRepo.save({
      menu_id: id,
    });
    await this.roleRepo.save({
      access_id: payload.access_id,
    });
    return this._success('Berhasil Membuat Role Access Menu');
  }
}
