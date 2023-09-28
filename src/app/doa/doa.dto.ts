import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
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
}

export class CreateKategoriDto extends PickType(DoaDto, ['kategori_name']) {}
export class CreateDoaDto extends OmitType(DoaDto, ['id']) {}
export class UpdateKategoriDoaDto extends PartialType(DoaDto) {}

export class CreateDoaArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDoaDto)
  data: CreateDoaDto[];
}
