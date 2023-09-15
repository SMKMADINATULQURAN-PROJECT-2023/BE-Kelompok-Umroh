import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
  isNumber,
} from 'class-validator';

export class RoleDto {
  @IsInt()
  id: number;

  @IsString()
  role_name: string;

  @IsNumber()
  actions: number;
}

export class CreateRoleDto extends PickType(RoleDto, ['role_name']) {}
export class UpdateRoleDto extends PartialType(RoleDto) {}
