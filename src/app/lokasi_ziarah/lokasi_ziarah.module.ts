import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LokasiZiarahController } from './lokasi_ziarah.controller';
import { LokasiZiarahService } from './lokasi_ziarah.service';
import { LokasiZiarah } from './entity/lokasi_ziarah.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConvertSlugService } from 'src/utils/service/convert_slug/convert_slug.service';

@Module({
  imports: [TypeOrmModule.forFeature([LokasiZiarah]), CloudinaryModule],
  controllers: [LokasiZiarahController],
  providers: [LokasiZiarahService, ConvertSlugService],
})
export class LokasiZiarahModule {}
