import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { Role } from '../role/entity/role.entity';
import { Menu } from '../menu/entity/menu.entity';
import { Repository } from 'typeorm';
import { AdminsPermissions } from './entity/role_access_menu.entity';
import { Admin } from '../admin/entities/admin.entity';
import { RoleAccessMenuDto } from './dto/role_access_menu.dto';

@Injectable()
export class RoleAccessMenuService extends BaseResponse {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
    @InjectRepository(AdminsPermissions)
    private readonly roleAccessMenuRepo: Repository<AdminsPermissions>,
  ) {
    super();
  }
  async create(payload: RoleAccessMenuDto): Promise<ResponseSuccess> {
    const admin = await this.adminRepo.findOne({
      where: {
        id: payload.adminId,
      },
    });
    if (!admin) throw new NotFoundException('Role Tidak Ditemukan');
    const role = await this.roleRepo.findOne({
      where: {
        id: payload.roleId,
      },
    });
    if (!role) throw new NotFoundException('Role Tidak Ditemukan');

    const menu = await this.menuRepo.findOne({
      where: {
        id: payload.menuId,
      },
    });
    if (!menu) throw new NotFoundException('Menu Tidak Ditemukan');

    await this.roleAccessMenuRepo.save({ ...payload });

    return this._success('Berhasil Membuat Role Access Menu');
  }
}
