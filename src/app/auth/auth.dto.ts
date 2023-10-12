import { PickType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { JenisKelamin } from 'src/interface';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(2)
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
  @MaxLength(13)
  @MinLength(9)
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

export class LoginDto extends PickType(UserDto, ['telephone', 'password']) {}
export class LoginAdminDto extends PickType(UserDto, ['email', 'password']) {}
