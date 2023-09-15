import { Module } from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { GaleriController } from './galeri.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Galeri } from './entity/galeri.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Galeri]), CloudinaryModule],
  providers: [GaleriService],
  controllers: [GaleriController],
})
export class GaleriModule {}
