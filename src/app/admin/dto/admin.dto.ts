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
  'avatar',
  'id_avatar',
  'refresh_token',
]) {}
export class UpdateAdminDto extends PartialType(AdminDto) {}
export class RefreshTokenDto extends PickType(AdminDto, [
  'id',
  'refresh_token',
]) {}
