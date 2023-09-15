import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { SiswaDto } from 'src/app/siswa/siswa.dto';

export class ArtikelDto {
  @IsInt()
  id: number;

  thumbnail: string;

  id_thumbnail: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsObject()
  @IsOptional()
  author: { username: string };
}

export class CreateArtikelDto extends OmitType(ArtikelDto, ['id']) {}
export class UpdateArtikelDto extends PartialType(ArtikelDto) {}
