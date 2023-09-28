import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
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
}

export class CreatePanduanDto extends OmitType(PanduanDto, ['id']) {}
export class UpdatePanduanDto extends PartialType(PanduanDto) {}
export class FindPanduanDto extends PageRequestDto {
  @IsOptional()
  @IsEnum(JenisKelamin)
  kategori: JenisKelamin;
}
