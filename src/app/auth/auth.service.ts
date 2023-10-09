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
import * as admin from 'firebase-admin';
import { NotFoundException } from '@nestjs/common/exceptions';
import { jwtPayload } from './auth.inteface';
import { Admin } from '../admin/entities/admin.entity';

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
    const check = await this.authRepository.findOne({
      where: {
        telephone: payload.telephone,
      },
    });
    if (check)
      throw new HttpException(
        'Nomor Handphone Anda Sudah Terdaftar',
        HttpStatus.FOUND,
      );

    payload.password = await hash(payload.password, 12);

    await this.authRepository.save(payload);

    return this._success('Berhasil Daftar');
  }

  async login(payload: LoginDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        telephone: payload.telephone,
      },
    });
    if (!checkUserExists)
      throw new NotFoundException(
        'Nomor Handphone Tidak Ditemukan Silahkan Daftar',
      );

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
        alamat: checkUserExists.alamat,
        tanggal_lahir: checkUserExists.tanggal_lahir,
      };

      const access_token = await this.generateJWT(jwtPayload, '9d');
      const refresh_token = await this.generateJWT(jwtPayload, '7d');
      await this.authRepository.save({
        refresh_token: refresh_token,
        id: checkUserExists.id,
      }); // simpan refresh token ke dalam tabel
      return this._success('Berhasil Login', {
        ...checkUserExists,
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      throw new HttpException(
        'Nomor Handphone Dan Password Tidak Cocok',
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
      throw new NotFoundException('Email Tidak ditemukan, Silahkan Daftar');
    const jwtPayload: jwtPayload = {
      id: checkUserExists.id,
      username: checkUserExists.username,
      email: checkUserExists.email,
      telephone: checkUserExists.telephone,
      alamat: checkUserExists.alamat,
      tanggal_lahir: checkUserExists.tanggal_lahir,
    };
    const access_token = await this.generateJWT(jwtPayload, '1d');
    const refresh_token = await this.generateJWT(jwtPayload, '7d');

    await this.authRepository.save({
      refresh_token: refresh_token,
      id: checkUserExists.id,
    });

    return this._success('Berhasil Login', {
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
    if (!user) throw new NotFoundException('User Tidak Ditemukan');
    return this._success('Berhasil Menemukan Profile', user);
  }
  async adminProfile(id: number): Promise<ResponseSuccess> {
    const user = await this.adminRepository.findOne({
      where: {
        id: id,
      },
      relations: ['role_id', 'role_id.action_id'],
    });
    if (!user) throw new NotFoundException('User Tidak Ditemukan');
    return this._success('Berhasil Menemukan Profile', user);
  }

  async forgotPassword(telephone: string): Promise<ResponseSuccess> {
    const user = await this.authRepository.findOne({
      where: {
        telephone,
      },
    });

    if (!user)
      throw new NotFoundException(
        'Nomor Handphone Belum Terdaftar, Silahkan Daftar',
      );
    const otp = Math.floor(100000 + Math.random() * 900000);

    const payload = {
      user: {
        telephone: user.telephone,
      },
      otp: otp,
    };
    // await admin.messaging().send({
    //   data: {
    //     otp: otp.toString(),
    //   },
    // phoneNumber: telephone,
    // });
    await this.resetPasswordRepository.save(payload);
    return this._success('SMS OTP telah dikirim');
  }

  async resetPassword(
    telephone: string,
    otp: number,
    payload: ResetPasswordDto,
  ): Promise<ResponseSuccess> {
    const userToken = await this.resetPasswordRepository.findOne({
      where: {
        user: {
          telephone: telephone,
        },
        otp: otp,
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
      telephone: telephone,
    });
    await this.resetPasswordRepository.delete({
      user: {
        telephone: telephone,
      },
    });

    return this._success('Reset Password Berhasil, Silahkan Login Ulang');
  }
}
