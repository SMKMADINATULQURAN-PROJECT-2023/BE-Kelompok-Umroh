import { OmitType, PickType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/interface/status.interface';
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

  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateArtikelDto extends OmitType(ArtikelDto, ['updated_by']) {}
export class UpdateArtikelDto extends OmitType(ArtikelDto, ['created_by']) {}
export class UpdateStatusArtikelDto extends PickType(ArtikelDto, ['status']) {}
export class FindArtikelDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsOptional()
  created_by: string;

  @IsString()
  @IsOptional()
  keyword: string;
}
