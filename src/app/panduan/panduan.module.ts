import { Module } from '@nestjs/common';
import { PanduanService } from './panduan.service';
import { PanduanController } from './panduan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panduan } from './entities/panduan.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Panduan])],
  controllers: [PanduanController],
  providers: [PanduanService, CloudinaryService],
})
export class PanduanModule {}
