import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { Artikel } from './entities/artikel.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConvertSlugService } from 'src/utils/service/convert_slug/convert_slug.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artikel]), CloudinaryModule],
  controllers: [ArtikelController],
  providers: [ArtikelService, ConvertSlugService],
})
export class ArtikelModule {}
