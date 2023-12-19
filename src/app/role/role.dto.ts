import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
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
  @IsEnum(UserRole)
  role_name: UserRole;

  @IsNumber()
  @IsNotEmpty()
  menu_id: number;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}

export class CreateRoleDto extends PickType(RoleDto, ['role_name']) {}
export class createRoleMenuDto extends OmitType(RoleDto, ['role_name']) {}
export class UpdateRoleDto extends PartialType(RoleDto) {}
