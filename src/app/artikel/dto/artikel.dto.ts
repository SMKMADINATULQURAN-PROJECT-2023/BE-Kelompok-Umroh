import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

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
export class FindArtikelDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
