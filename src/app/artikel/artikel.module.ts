import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';
import { Artikel } from './entities/artikel.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artikel]), CloudinaryModule],
  controllers: [ArtikelController],
  providers: [ArtikelService],
})
export class ArtikelModule {}
