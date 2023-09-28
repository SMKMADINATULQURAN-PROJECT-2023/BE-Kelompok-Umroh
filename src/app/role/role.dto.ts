import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserRole } from 'src/interface';

export class RoleDto {
  @IsInt()
  id: number;

  @IsEnum(UserRole)
  role_name: UserRole;
}

export class CreateRoleDto extends OmitType(RoleDto, ['id']) {}
export class UpdateRoleDto extends PartialType(RoleDto) {}
