import { Module } from '@nestjs/common';
import { DoaService } from './doa.service';
import { DoaController } from './doa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doa } from './entity/doa.entity';
import { KategoriDoa } from './entity/category_doa.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Doa, KategoriDoa])],
  controllers: [DoaController],
  providers: [DoaService, CloudinaryService],
})
export class DoaModule {}
