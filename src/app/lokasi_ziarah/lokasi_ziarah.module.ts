import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LokasiZiarahController } from './lokasi_ziarah.controller';
import { LokasiZiarahService } from './lokasi_ziarah.service';
import { LokasiZiarah } from './entity/lokasi_ziarah.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { Traffic } from '../traffic/entity/traffic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LokasiZiarah, Traffic]),
    CloudinaryModule,
  ],
  controllers: [LokasiZiarahController],
  providers: [LokasiZiarahService],
})
export class LokasiZiarahModule {}
