import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ArtikelDto {
  thumbnail: string;

  id_thumbnail: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateArtikelDto extends OmitType(ArtikelDto, ['updated_by']) {}
export class UpdateArtikelDto extends OmitType(ArtikelDto, ['created_by']) {}
