import { PartialType, PickType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { JenisKelamin } from 'src/utils/interface';

export class UserDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  email_verified: boolean;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @MinLength(9)
  telephone: string;

  @IsString()
  @IsOptional()
  alamat: string;

  @IsDate()
  @IsOptional()
  tanggal_lahir: Date;

  @IsString()
  refresh_token: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(JenisKelamin)
  jenis_kelamin: JenisKelamin;
}

export class ResetPasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  refresh_token: string;

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
export class LoginGoogleDto extends PickType(UserDto, [
  'avatar',
  'username',
  'email',
  'email_verified',
]) {
  @IsOptional()
  @IsString()
  telephone: string;
}
export class LoginAdminDto extends PickType(UserDto, ['email', 'password']) {}
export class updateProfileDto extends PartialType(UserDto) {}
