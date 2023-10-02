import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
@Injectable()
export class DoaDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
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

  slug: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateKategoriDto extends PickType(DoaDto, [
  'slug',
  'kategori_name',
  'created_by',
]) {}
export class UpdateKategoriDto extends PickType(DoaDto, [
  'id',
  'kategori_name',
  'slug',
  'updated_by',
]) {}
export class CreateDoaDto extends OmitType(DoaDto, [
  'id',
  'kategori_name',
  'updated_by',
]) {}
export class UpdateDoaDto extends OmitType(DoaDto, ['created_by']) {}
