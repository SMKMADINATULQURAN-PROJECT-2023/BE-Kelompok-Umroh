import { HttpStatus } from '@nestjs/common/enums';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import { CreateRoleDto, UpdateRoleDto, createRoleMenuDto } from './role.dto';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { Menu } from '../menu/entity/menu.entity';

@Injectable()
export class RoleService extends BaseResponse {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {
    super();
  }
  async create(payload: CreateRoleDto): Promise<ResponseSuccess> {
    const check = await this.roleRepo.findOne({
      where: {
        role_name: payload.role_name,
      },
    });
    if (check) throw new HttpException('Role Sudah Ada', HttpStatus.FOUND);
    await this.roleRepo.save(payload);
    return this._success('Berhasil Membuat Role');
  }

  async get(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const [result, count] = await this.roleRepo.findAndCount({
      take: pageSize,
      skip: limit,
      relations: ['menus'],
    });

    return this._pagination(
      'Berhasil Menemukan Role',
      result,
      count,
      page,
      pageSize,
    );
  }

  async update(id: number, payload: UpdateRoleDto): Promise<ResponseSuccess> {
    const check = await this.roleRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    await this.roleRepo.save({
      ...payload,
      id: id,
    });
    return this._success('Berhasil Mengupdate Role');
  }

  async delete(id: number) {
    const check = await this.roleRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    await this.roleRepo.delete(id);
    return this._success('Berhasil Menghapus Role');
  }

  async detail(id: number): Promise<ResponseSuccess> {
    const check = await this.roleRepo.findOne({
      where: { id: id },
    });

    if (!check)
      throw new HttpException(
        `Role Dengan Id ${id} Tidak Ditemkan`,
        HttpStatus.NOT_FOUND,
      );

    return this._success('Berhasil Menemukan Detail Role', check);
  }

  async createRoleMenu(payload: createRoleMenuDto): Promise<ResponseSuccess> {
    const role = await this.roleRepo.findOne({
      where: {
        id: payload.role_id,
      },
    });
    if (!role) throw new NotFoundException('Role Tidak Ditemukan');

    const menu = await this.menuRepo.findOne({
      where: {
        id: payload.menu_id,
      },
      relations: {
        roles: true,
      },
    });
    if (!menu) throw new NotFoundException('Menu Tidak Ditemukan');

    menu.roles.push(role); // Assign the role entity to the 'roles' property of the role entity
    await this.menuRepo.save(menu); // Save the new
    return this._success('Berhasil Membuat Relasi Antara Role Dan Menu');
  }
}
