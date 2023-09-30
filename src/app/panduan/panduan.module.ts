import { Module } from '@nestjs/common';
import { PanduanService } from './panduan.service';
import { PanduanController } from './panduan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panduan } from './entities/panduan.entity';
import { ConvertSlugService } from 'src/utils/service/convert_slug/convert_slug.service';

@Module({
  imports: [TypeOrmModule.forFeature([Panduan])],
  controllers: [PanduanController],
  providers: [PanduanService, ConvertSlugService],
})
export class PanduanModule {}
