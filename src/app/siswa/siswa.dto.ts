import { OmitType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class SiswaDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  nama_siswa: string;

  @IsString()
  @IsOptional()
  nisn: string;

  @IsString()
  @IsNotEmpty()
  kelas: string;

  @IsString()
  @IsOptional()
  tempat_lahir: string;

  @IsDate()
  @IsOptional()
  tanggal_lahir: Date;

  @IsString()
  @IsOptional()
  jenis_kelamin: string;

  @IsString()
  @IsNotEmpty()
  secret_key: string;

  @IsObject()
  @IsOptional()
  updated_by: { id: number };
  @IsObject()
  @IsOptional()
  created_by: { id: number };
}

export class CreateSiswaDto extends OmitType(SiswaDto, ['id']) {}
export class ImportSiswaDto extends PickType(SiswaDto, ['secret_key']) {}
export class UpdateSiswaDto extends SiswaDto {}
export class CreateSiswaArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSiswaDto)
  data: CreateSiswaDto[];
}
export class findAllSiswaDto extends PageRequestDto {
  @IsString()
  @IsOptional()
  nama_siswa: string;
}

export class findCatatanDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  ta_id: number;
}
