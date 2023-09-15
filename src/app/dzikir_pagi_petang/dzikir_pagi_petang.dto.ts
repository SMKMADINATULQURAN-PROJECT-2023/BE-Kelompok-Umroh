import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';

export class DzikirPagiPetangDto {
  @IsInt()
  id: number;

  @IsString()
  nama: string;

  @IsString()
  arab: string;

  @IsString()
  latin: string;

  @IsString()
  arti: string;

  @IsString()
  diBaca: string;
}
export class CreateDzikirPagiPetangDto extends OmitType(DzikirPagiPetangDto, [
  'id',
]) {}

export class CreateDzikirPagiPetangArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDzikirPagiPetangDto)
  data: CreateDzikirPagiPetangDto[];
}
