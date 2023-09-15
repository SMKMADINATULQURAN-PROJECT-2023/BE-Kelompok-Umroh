import { Injectable, NotFoundException } from '@nestjs/common';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';
import { hash } from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entity/role.entity';
import { Not, Repository } from 'typeorm';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Injectable()
export class AdminService extends BaseResponse {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
    super();
  }
  async create(payload: CreateAdminDto): Promise<ResponseSuccess> {
    const checkRole = await this.roleRepository.findOne({
      where: { id: payload.role },
    });
    if (!checkRole) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }
    payload.password = await hash(payload.password, 12);

    await this.adminRepository.save({
      ...payload,
      role: {
        id: payload.role,
      },
    });

    return this._success('Berhasil Membuat Akun Admin');
  }

  async findAll(
    query: PageRequestDto,
    userId: number,
  ): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const total = await this.adminRepository.count();
    const result = await this.adminRepository.find({
      where: { id: Not(userId) },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
      take: pageSize,
      skip: limit,
    });
    return this._pagination(
      'Berhasil Menemukan List Admin',
      result,
      total,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.adminRepository.findOne({
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
      },
      where: { id: id },
    });
    if (!result) {
      throw new NotFoundException('Detail Admin Tidak Ditemukan');
    }
    return this._success('Berhasil Menemukan Detail Admin', result);
  }

  async update(id: number, payload: UpdateAdminDto): Promise<ResponseSuccess> {
    const check = await this.adminRepository.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new NotFoundException(
        `Detail Admin Dengan Id ${id} Tidak Ditemukan`,
      );
    }
    const checkRole = await this.roleRepository.findOne({
      where: { id: payload.role },
    });
    if (!checkRole) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }
    await this.adminRepository.save({
      ...payload,
      role: { id: payload.role },
      id,
    });
    return this._success('Berhasil Mengupdate Akun Admin');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.adminRepository.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new NotFoundException(
        `Detail Admin Dengan Id ${id} Tidak Ditemukan`,
      );
    }
    await this.adminRepository.delete(id);
    return this._success('Berhasil Menghapus Akun Admin');
  }
}
