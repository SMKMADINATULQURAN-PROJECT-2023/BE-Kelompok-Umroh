import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique.validator';
import { Admin } from '../entities/admin.entity';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class AdminDto {
  @IsInt()
  id: number;

  @IsString()
  @IsUnique([Admin, 'username'])
  username: string;

  @IsString()
  avatar: string;

  @IsString()
  @IsEmail()
  @IsUnique([Admin, 'email'])
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  refresh_token: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}

export class CreateAdminDto extends OmitType(AdminDto, ['id']) {}
export class UpdateAdminDto extends PartialType(AdminDto) {}
