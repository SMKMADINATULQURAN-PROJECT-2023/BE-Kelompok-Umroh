import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { compare, hash } from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entity/role.entity';
import { Like, Not, Repository } from 'typeorm';
import {
  CreateAdminDto,
  FindAdminDto,
  RefreshTokenDto,
  UpdateAdminDto,
} from './dto/admin.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt.config';
import { LoginAdminDto } from '../auth/auth.dto';
@Injectable()
export class AdminService extends BaseResponse {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private cloudinary: CloudinaryService,
    private jwtService: JwtService,
  ) {
    super();
  }
  generateJWT(payload: jwtPayload, expiresIn: string | number) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: expiresIn,
    });
  } //membuat method untuk generate jwt

  async loginAdmin(payload: LoginAdminDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.adminRepository.findOne({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        role_id: {
          id: true,
          role_name: true,
          action_id: {
            id: true,
            action_name: true,
          },
        },
      },
      relations: ['role_id', 'role_id.action_id'], // Nama relasi dan relasi bersarang
    });

    if (!checkUserExists) {
      throw new HttpException(
        'User tidak ditemukan',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const jwtPayload: jwtPayload = {
        id: checkUserExists.id,
        username: checkUserExists.username,
        email: checkUserExists.email,
        role_id: checkUserExists.role_id,
      };

      const access_token = await this.generateJWT(jwtPayload, '1d');
      const refresh_token = await this.generateJWT(jwtPayload, '7d');
      await this.adminRepository.save({
        refresh_token: refresh_token,
        id: checkUserExists.id,
      }); // simpan refresh token ke dalam tabel
      return this._success('Login Success', {
        ...checkUserExists,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      throw new HttpException(
        'email dan password tidak sama',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async refreshToken(payload: RefreshTokenDto) {
    const check = await this.adminRepository.findOne({
      where: {
        refresh_token: payload.refresh_token,
        id: payload.id,
      },
    });

    if (!check) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    await this.jwtService.verify(payload.refresh_token, {
      secret: jwt_config.secret,
    });

    const jwtPayload: jwtPayload = {
      id: check.id,
      username: check.username,
      email: check.email,
      role_id: check.role_id,
    };

    const access_token = await this.generateJWT(jwtPayload, '1d');
    const refresh_token = await this.generateJWT(jwtPayload, '7d');

    await this.adminRepository.save({
      refresh_token: refresh_token,
      id: check?.id,
    });

    return this._success('Berhasil Mendapatkan Access Token', {
      ...check,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }

  async create(payload: CreateAdminDto): Promise<ResponseSuccess> {
    const checkRole = await this.roleRepository.findOne({
      where: { id: payload.role_id },
    });
    if (!checkRole) throw new NotFoundException('Role Tidak Ditemukan');

    payload.password = await hash(payload.password, 10);

    await this.adminRepository.save({
      ...payload,
      role_id: {
        id: payload.role_id,
      },
    });

    return this._success('Berhasil Membuat Akun Admin');
  }

  async findAll(
    query: FindAdminDto,
    userId: number,
  ): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword } = query;

    const filter: any = {
      id: Not(userId),
    };
    if (keyword) {
      filter['username'] = Like(`%${keyword}%`);
      filter['email'] = Like(`%${keyword}%`);
      filter['role_id.role_name'] = Like(`%${keyword}%`);
    }
    console.log(filter);
    const total = await this.adminRepository.count({ where: filter });
    const result = await this.adminRepository.find({
      where: filter,
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        role_id: {
          id: true,
          role_name: true,
          action_id: {
            action_name: true,
            description: true,
          },
        },
      },
      relations: ['role_id', 'role_id.action_id'],
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
        role_id: {
          id: true,
          role_name: true,
          action_id: {
            action_name: true,
            description: true,
          },
        },
      },
      relations: ['role_id', 'role_id.action_id'],
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
      where: { id: payload.role_id },
    });
    if (!checkRole) {
      throw new NotFoundException('Role Tidak Ditemukan');
    }

    await this.adminRepository.save({
      ...payload,
      role_id: { id: payload.role_id },
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

  async myProfile(id: number): Promise<ResponseSuccess> {
    const user = await this.adminRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        role_id: {
          id: true,
          role_name: true,
          action_id: {
            id: true,
            action_name: true,
          },
        },
      },
      relations: ['role', 'role.action_id'],
    });

    return this._success('Berhasil Menemukan Profile', user);
  }

  async editProfile(
    file: Express.Multer.File,
    payload: UpdateAdminDto,
    id: number,
  ): Promise<ResponseSuccess> {
    const check = await this.adminRepository.findOne({
      where: { id: id },
    });
    if (!check) {
      throw new HttpException(
        `Profile Dengan id ${id} Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    if (!file?.path) {
      payload.avatar = check.avatar;
      payload.id_avatar = check.id_avatar;
    }
    if (
      file?.mimetype == 'image/png' ||
      file?.mimetype == 'image/jpeg' ||
      file?.mimetype == 'image/jpg'
    ) {
      const { public_id, url } = await this.cloudinary.uploadImage(
        file,
        'admin',
      );
      payload.avatar = url;
      payload.id_avatar = public_id;
    } else {
      throw new HttpException(
        ' file harus berekstensi .jpg, .jpeg, .png',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!check.id_avatar) {
      await this.adminRepository.save({
        ...payload,
        role_id: { id: payload.role_id },
        id: id,
      });
    }
    return this._success('Berhasil Mengupdate Profile');
  }
}
