import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsObject, IsOptional, IsString } from 'class-validator';
import { JenisKelamin } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
export class PanduanDto {
  @IsInt()
  id: number;

  video: string;

  id_video: string;

  @IsString()
  title: string;

  @IsString()
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

export class CreatePanduanDto extends OmitType(PanduanDto, [
  'id',
  'updated_by',
]) {}
export class UpdatePanduanDto extends OmitType(PanduanDto, ['created_by']) {}
export class FindPanduanDto extends PageRequestDto {
  @IsOptional()
  @IsEnum(JenisKelamin)
  kategori: JenisKelamin;
}
