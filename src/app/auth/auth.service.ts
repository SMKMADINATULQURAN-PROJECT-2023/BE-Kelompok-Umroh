import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { User } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface';
import { LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt.config';
import { MailService } from '../mail/mail.service';
import { ResetPassword } from './entity/reset_password.entity';
import { randomBytes } from 'crypto';
import { Admin } from '../admin/entities/admin.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,

    private jwtService: JwtService,
    private mailService: MailService,
  ) {
    super();
  }

  generateJWT(payload: jwtPayload, expiresIn: string | number) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: expiresIn,
    });
  } //membuat method untuk generate jwt

  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    payload.password = await hash(payload.password, 12);

    await this.authRepository.save(payload);

    return this._success('Register Berhasil');
  }

  async login(payload: LoginDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        telephone: payload.telephone,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        password: true,
        telephone: true,
        tempat_lahir: true,
        tanggal_lahir: true,
      },
    });
    if (!checkUserExists) throw new NotFoundException('User Tidak Ditemkan');

    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const jwtPayload: jwtPayload = {
        id: checkUserExists.id,
        username: checkUserExists.username,
        email: checkUserExists.email,
        telephone: checkUserExists.telephone,
        tempat_lahir: checkUserExists.tempat_lahir,
        tanggal_lahir: checkUserExists.tanggal_lahir,
      };

      const access_token = await this.generateJWT(jwtPayload, '1d');
      const refresh_token = await this.generateJWT(jwtPayload, '7d');
      await this.authRepository.save({
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

  async loginGoogle(email: string): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!checkUserExists)
      throw new NotFoundException('Email Tidak ditemukan, Silahkan Register');
    const jwtPayload: jwtPayload = {
      id: checkUserExists.id,
      username: checkUserExists.username,
      email: checkUserExists.email,
      telephone: checkUserExists.telephone,
      tempat_lahir: checkUserExists.tempat_lahir,
      tanggal_lahir: checkUserExists.tanggal_lahir,
    };
    const access_token = await this.generateJWT(jwtPayload, '1d');
    const refresh_token = await this.generateJWT(jwtPayload, '7d');

    await this.authRepository.save({
      refresh_token: refresh_token,
      id: checkUserExists.id,
    });

    return this._success('Login Success', {
      ...checkUserExists,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }

  async profile(id: number): Promise<ResponseSuccess> {
    const user = await this.authRepository.findOne({
      where: {
        id: id,
      },
    });

    return this._success('Berhasil Menemukan Profile', user);
  }

  async forgotPassword(email: string): Promise<ResponseSuccess> {
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw new NotFoundException('Email Tidak ditemukan');
    const token = randomBytes(32).toString('hex');
    const link = `${process.env.MAIL_CLIENT_URL}auth/reset-password/${user.id}/${token}`;
    await this.mailService.sendForgotPassword({
      email: email,
      username: user.username,
      link: link,
    });

    const payload = {
      user: {
        id: user.id,
      },
      token: token,
    };

    await this.resetPasswordRepository.save(payload);
    console.log(token);
    return this._success('Silahkan Cek Email');
  }

  async resetPassword(
    user_id: number,
    token: string,
    payload: ResetPasswordDto,
  ): Promise<ResponseSuccess> {
    const userToken = await this.resetPasswordRepository.findOne({
      where: {
        token: token,
        user: {
          id: user_id,
        },
      },
    });

    if (!userToken) {
      throw new HttpException(
        'Token tidak valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    payload.new_password = await hash(payload.new_password, 12);
    await this.authRepository.save({
      password: payload.new_password,
      id: user_id,
    });
    await this.resetPasswordRepository.delete({
      user: {
        id: user_id,
      },
    });

    return this._success('Reset Passwod Berhasil, Silahkan login ulang');
  }
}
