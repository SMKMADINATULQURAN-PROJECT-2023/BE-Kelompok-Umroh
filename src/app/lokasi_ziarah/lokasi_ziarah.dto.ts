import { Injectable } from '@nestjs/common';
import { OmitType, PartialType } from '@nestjs/mapped-types';

import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Injectable()
export class LokasiZiarahDto {
  @IsInt()
  id: number;

  thumbnail: any;

  id_thumbnail: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  latitude: string;

  @IsString()
  @IsNotEmpty()
  longitude: string;

  slug: string;

  @IsObject()
  @IsOptional()
  created_by: { id: number };

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
}

export class CreateZiarahDto extends OmitType(LokasiZiarahDto, [
  'id',
  'updated_by',
]) {}

export class FindZiarahDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  keyword: string;
}
export class UpdateZiarahDto extends OmitType(LokasiZiarahDto, [
  'created_by',
]) {}
