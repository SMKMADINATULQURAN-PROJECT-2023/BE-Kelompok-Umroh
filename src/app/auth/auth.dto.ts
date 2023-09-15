import { OmitType, PickType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';

import { JenisKelamin } from './entity/auth.entity';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsString()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(10)
  telephone: string;

  @IsString()
  tempat_lahir: string;

  @IsDate()
  tanggal_lahir: Date;

  @IsString()
  refresh_token: string;

  @IsString()
  @IsEnum(JenisKelamin)
  jenis_kelamin: JenisKelamin;
}

export class ResetPasswordDto {
  @IsString()
  @MinLength(8)
  new_password: string;
}

export class RegisterDto extends PickType(UserDto, [
  'username',
  'telephone',
  'password',
  'jenis_kelamin',
]) {}

export class LoginDto extends PickType(UserDto, ['email', 'password']) {}

export class LoginAdminDto extends PickType(UserDto, ['email', 'password']) {}
