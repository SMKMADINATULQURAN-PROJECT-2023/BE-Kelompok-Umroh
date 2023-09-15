import { Injectable } from '@nestjs/common';
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';

import { PageRequestDto } from 'src/utils/dto/page.dto';
@Injectable()
export class GaleriDto {
  @IsInt()
  id: number;

  thumbnail: any;

  id_thumbnail: string;
}
export class CreateGaleriDto extends OmitType(GaleriDto, ['id']) {}
export class FindGaleriDto extends PageRequestDto {}
export class UpdateGaleriDto extends PartialType(GaleriDto) {}
