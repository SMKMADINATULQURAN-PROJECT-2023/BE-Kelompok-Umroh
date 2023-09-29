import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ArtikelDto {
  @IsInt()
  id: number;

  thumbnail: string;

  id_thumbnail: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  slug: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateArtikelDto extends OmitType(ArtikelDto, [
  'id',
  'updated_by',
]) {}
export class UpdateArtikelDto extends OmitType(ArtikelDto, ['created_by']) {}
