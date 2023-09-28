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
}

export class CreateArtikelDto extends OmitType(ArtikelDto, ['id']) {}
export class UpdateArtikelDto extends PartialType(ArtikelDto) {}
