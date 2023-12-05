import { IsUnique } from 'src/utils/validator/unique.validator';
import { Menu } from '../entity/menu.entity';
import {
  IsObject,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class MenuDto {
  @IsUnique([Menu, 'name'])
  @IsNotEmpty()
  @IsString()
  menu_name: string;

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
export class UpdateMenuDto extends OmitType(MenuDto, ['created_by']) {
  @IsNotEmpty()
  @IsString()
  menu_name: string;
}
