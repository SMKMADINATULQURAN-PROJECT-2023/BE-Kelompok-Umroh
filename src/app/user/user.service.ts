import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from '../auth/entity/auth.entity';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { RefreshTokenDto } from '../admin/dto/admin.dto';
import { jwtPayload } from '../auth/auth.inteface';
import { jwt_config } from 'src/config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from './dto/user.dto';

@Injectable()
export class UserService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {
    super();
  }
  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  } //membuat method untuk generate jwt

  async findAll(query: FindUserDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, keyword } = query;
    const filterKeyword = [];
    if (keyword) {
      filterKeyword.push(
        {
          email: Like(`%${keyword}%`),
        },
        {
          username: Like(`%${keyword}%`),
        },
        {
          telephone: Like(`%${keyword}%`),
        },
      );
    }
    const [result, count] = await this.userRepo.findAndCount({
      where: keyword && filterKeyword,
      take: pageSize,
      skip: limit,
    });
    return this._pagination(
      'Berhasil Menemukan User',
      result,
      count,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const check = await this.userRepo.find({
      where: { id },
    });

    if (!check) throw new NotFoundException('User Tidak Ditemukan');

    return this._success('Berhasil Menemukan Detail User', check);
  }

  async refreshToken(payload: RefreshTokenDto) {
    const check = await this.userRepo.findOne({
      where: {
        refresh_token: payload.refresh_token,
        id: payload.id,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        email_verified: true,
        telephone: true,
        alamat: true,
        tanggal_lahir: true,
        jenis_kelamin: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!check) {
      console.log('err');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const jwtPayload: jwtPayload = {
      id: check.id,
      username: check.username,
      email: check.email,
      telephone: check.telephone,
      alamat: check.alamat,
      tanggal_lahir: check.tanggal_lahir,
      role_id: 'User',
    };

    const access_token = await this.generateJWT(
      jwtPayload,
      '1d',
      jwt_config.access_token_secret,
    );
    const refresh_token = await this.generateJWT(
      jwtPayload,
      '7d',
      jwt_config.refresh_token_secret,
    );

    await this.userRepo.save({
      refresh_token: refresh_token,
      id: check?.id,
    });

    return this._success('Berhasil Mendapatkan Access Token', {
      ...check,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }
}
