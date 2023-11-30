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
import { UserRole } from 'src/utils/interface';

export class RoleDto {
  @IsInt()
  id: number;

  @IsEnum(UserRole)
  role_name: UserRole;
}

export class CreateRoleDto extends OmitType(RoleDto, ['id']) {}
export class createRoleMenuDto {
  @IsNumber()
  @IsNotEmpty()
  menu_id: number;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
export class UpdateRoleDto extends PartialType(RoleDto) {}
