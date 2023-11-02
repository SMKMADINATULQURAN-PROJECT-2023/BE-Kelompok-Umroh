import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { OmitType, PickType } from '@nestjs/mapped-types';
import { IsUnique } from 'src/utils/validator/unique.validator';
import { KategoriDoa } from './entity/category_doa.entity';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { Status } from 'src/interface/status.interface';
@Injectable()
export class DoaDto {
  thumbnail: any;

  id_thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @IsUnique([KategoriDoa, 'kategori_name'])
  kategori_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  arab: string;

  @IsString()
  @IsNotEmpty()
  latin: string;

  @IsString()
  @IsNotEmpty()
  arti: string;

  @IsNumber()
  @IsNotEmpty()
  kategori_id: number;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateKategoriDto extends PickType(DoaDto, [
  'thumbnail',
  'id_thumbnail',
  'kategori_name',
  'created_by',
]) {}
export class UpdateKategoriDto extends PickType(DoaDto, [
  'thumbnail',
  'id_thumbnail',
  'kategori_name',
  'updated_by',
]) {}
export class FindKategoriDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsOptional()
  keyword: string;
}
export class CreateDoaDto extends OmitType(DoaDto, [
  'kategori_name',
  'thumbnail',
  'id_thumbnail',
  'updated_by',
]) {}
export class UpdateDoaDto extends OmitType(DoaDto, [
  'created_by',
  'kategori_name',
  'thumbnail',
  'id_thumbnail',
]) {}
export class FindDoaDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  @IsEnum(Status)
  status: Status;

  @IsString()
  @IsOptional()
  keyword: string;
}
