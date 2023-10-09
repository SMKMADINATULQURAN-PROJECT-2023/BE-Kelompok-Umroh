import { PickType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { JenisKelamin } from 'src/interface';
import { Match } from 'src/utils/decorator/match.decorator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(4)
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

  @IsString()
  @MinLength(4)
  @MinLength(8)
  @Match('new_password')
  passwordConfirm: string;
}

export class RegisterDto extends PickType(UserDto, [
  'username',
  'telephone',
  'password',
  'jenis_kelamin',
]) {}

export class LoginDto extends PickType(UserDto, ['telephone', 'password']) {}
export class LoginAdminDto extends PickType(UserDto, ['email', 'password']) {}
