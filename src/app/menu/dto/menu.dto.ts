import {
  IsObject,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { MenuName } from 'src/utils/interface/manu.interface';

export class MenuDto {
  @IsEnum(MenuName)
  @IsNotEmpty()
  @IsString()
  menu_name: MenuName;

  @IsNotEmpty()
  @IsString()
  permission: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}
export class CreateMenuDto extends OmitType(MenuDto, ['updated_by']) {}
export class UpdateMenuDto extends OmitType(MenuDto, ['created_by']) {}
