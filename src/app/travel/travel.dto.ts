import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class TravelDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  nama_travel: string;

  @IsString()
  @IsNotEmpty()
  nama_perusahaan: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nomor_izin_umrah: string;

  @IsString()
  @IsNotEmpty()
  nomor_izin_haji: string;

  @IsString()
  @IsNotEmpty()
  paket: string;
}
