import { HttpStatus } from '@nestjs/common/enums';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Role } from './entity/role.entity';
import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Injectable()
export class RoleService extends BaseResponse {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
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
}
