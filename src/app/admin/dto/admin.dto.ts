import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique.validator';
import { Admin } from '../entities/admin.entity';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class AdminDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  username: string;

  avatar: any;

  id_avatar: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUnique([Admin, 'email'])
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  refresh_token: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}

export class FindAdminDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
export class CreateAdminDto extends OmitType(AdminDto, [
  'id',
  'refresh_token',
]) {}
export class UpdateAdminDto extends PickType(AdminDto, [
  'avatar',
  'id_avatar',
  'username',
  'role_id',
]) {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
export class UpdateProfileAdminDto extends PickType(AdminDto, [
  'avatar',
  'id_avatar',
  'username',
]) {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
export class RefreshTokenDto extends PickType(AdminDto, [
  'id',
  'refresh_token',
]) {}
