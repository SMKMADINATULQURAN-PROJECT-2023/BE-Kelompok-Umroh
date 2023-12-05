import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { User } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/utils/interface';
import {
  LoginDto,
  LoginGoogleDto,
  RegisterDto,
  ResetPasswordDto,
  updateProfileDto,
} from './auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt.config';
import { ResetPassword } from './entity/reset_password.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { jwtPayload } from './auth.inteface';
import { Admin } from '../admin/entities/admin.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateProfileAdminDto } from '../admin/dto/admin.dto';
const ALLOWEDMIMETYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/webm',
];
@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,
    private jwtService: JwtService,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }

  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  } //membuat method untuk generate jwt

  // ** User =================================
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
        'Nomor Handphone Tidak Ditemukan, Silahkan Daftar',
      );
    const data = await this.authRepository.findOne({
      where: {
        telephone: payload.telephone,
      },
      select: [
        'id',
        'avatar',
        'username',
        'email',
        'email_verified',
        'telephone',
        'alamat',
        'tanggal_lahir',
        'refresh_token',
        'created_at',
        'updated_at',
      ],
    });
    const jwtPayload: jwtPayload = {
      id: checkUserExists.id,
      username: checkUserExists.username,
      email: checkUserExists.email,
      telephone: checkUserExists.telephone,
      alamat: checkUserExists.alamat,
      tanggal_lahir: checkUserExists.tanggal_lahir,
      role_id: 'User',
    };
    const checkPassword = await compare(
      payload.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const [access_token, refresh_token] = await Promise.all([
        this.generateJWT(jwtPayload, '1d', jwt_config.access_token_secret),
        this.generateJWT(jwtPayload, '7d', jwt_config.refresh_token_secret),
      ]);

      await this.authRepository.save({
        refresh_token: refresh_token,
        id: checkUserExists.id,
      }); // simpan refresh token ke dalam tabel
      return this._success('Berhasil Login', {
        ...data,
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

  async loginGoogle(payload: LoginGoogleDto): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    const userData =
      checkUserExists || (await this.authRepository.save(payload));
    const jwtPayload: jwtPayload = {
      id: userData.id,
      avatar: userData.avatar,
      username: userData.username,
      email: userData.email,
      email_verified: userData.email_verified,
      telephone: userData.telephone,
      role_id: 'User',
    };

    const [access_token, refresh_token] = await Promise.all([
      this.generateJWT(jwtPayload, '1d', jwt_config.access_token_secret),
      this.generateJWT(jwtPayload, '7d', jwt_config.refresh_token_secret),
    ]);

    return this._success('Berhasil Login', {
      ...userData,
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

  async updateProfile(
    payload: updateProfileDto,
    file: Express.Multer.File,
    id: number,
  ): Promise<ResponseSuccess> {
    const check = await this.authRepository.findOne({
      where: {
        id,
      },
    });

    if (!check) {
      throw new NotFoundException('User Tidak Ditemukan');
    }

    if (file) {
      if (ALLOWEDMIMETYPES.includes(file.mimetype)) {
        const { url } = await this.cloudinary.uploadImage(file, 'user');
        payload.avatar = url;
      } else {
        throw new HttpException(
          ' file harus berekstensi .jpg, .jpeg, .png',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      payload.avatar = check.avatar;
    }

    await this.authRepository.save({
      ...payload,
      id,
    });

    return this._success('Berhasil Mengupdate User');
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

  async updatePassword(
    payload: ResetPasswordDto,
    id: number,
  ): Promise<ResponseSuccess> {
    const check = await this.authRepository.findOne({
      where: {
        refresh_token: payload.refresh_token,
        id: id,
      },
    });

    if (!check) {
      throw new HttpException(
        'Token tidak valid',
        HttpStatus.UNPROCESSABLE_ENTITY, // jika tidak sah , berikan pesan token tidak valid
      );
    }
    payload.new_password = await hash(payload.new_password, 12); //hash password
    await this.authRepository.save({
      password: payload.new_password,
      id: id,
    });
    return this._success('Berhasil Mengupdate Password');
  }

  // ** Admin =================================
  async adminProfile(id: number): Promise<ResponseSuccess> {
    const user = await this.adminRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true,
        refresh_token: true,
        role_id: {
          id: true,
          role_name: true,
          menus: {
            id: true,
            menu_name: true,
            permission: true,
          },
        },
      },
      relations: ['role_id', 'role_id.menus', 'role_id.menus'],
    });
    if (!user) throw new NotFoundException('User Tidak Ditemukan');
    return this._success('Berhasil Menemukan Profile', user);
  }

  async updateProfileAdmin(
    file: Express.Multer.File,
    payload: UpdateProfileAdminDto,
    id: number,
    refresh_token: string,
  ): Promise<ResponseSuccess> {
    const check = await this.adminRepository.findOne({
      where: { id: id, refresh_token: refresh_token },
    });
    if (!check) {
      throw new HttpException(`Token Tidak Valid`, HttpStatus.NOT_FOUND);
    }
    if (check.email === payload.email && !check.id)
      throw new HttpException('Email Sudah Digunakan', HttpStatus.BAD_REQUEST);

    if (file) {
      if (ALLOWEDMIMETYPES.includes(file.mimetype)) {
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
    } else if (check.avatar || check.id_avatar) {
      payload.avatar = check.avatar;
      payload.id_avatar = check.id_avatar;
    }
    await this.adminRepository.save({
      ...payload,
      id: id,
    });

    return this._success('Berhasil Mengupdate Profile');
  }
}
