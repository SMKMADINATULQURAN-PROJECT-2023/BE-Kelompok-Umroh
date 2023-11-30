import { OmitType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { JenisKelamin } from 'src/utils/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { KategoriPanduan } from '../entities/panduan.entity';
import { Status } from 'src/utils/interface/status.interface';
export class PanduanDto {
  thumbnail: string;

  id_thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'URL harus berupa tautan YouTube yang valid' })
  link: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(JenisKelamin)
  gender: JenisKelamin;

  @IsString()
  @IsEnum(KategoriPanduan)
  kategori_panduan: KategoriPanduan;

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
  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsOptional()
  created_by: string;

  @IsOptional()
  @IsEnum(KategoriPanduan)
  kategori_panduan: KategoriPanduan;

  @IsOptional()
  @IsEnum(JenisKelamin)
  gender: JenisKelamin;

  @IsOptional()
  @IsString()
  keyword: string;
}
