import { OmitType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { JenisKelamin } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
export class PanduanDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'URL harus berupa tautan YouTube yang valid' })
  url: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(JenisKelamin)
  kategori: JenisKelamin;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreatePanduanDto extends OmitType(PanduanDto, ['updated_by']) {}
export class UpdatePanduanDto extends OmitType(PanduanDto, ['created_by']) {}
export class FindPanduanDto extends PageRequestDto {
  @IsOptional()
  @IsEnum(JenisKelamin)
  kategori: JenisKelamin;

  @IsOptional()
  @IsString()
  keyword: string;
}
