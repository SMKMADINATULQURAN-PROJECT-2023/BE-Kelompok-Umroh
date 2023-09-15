import { Module } from '@nestjs/common';
import { DoaService } from './doa.service';
import { DoaController } from './doa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doa } from './entity/doa.entity';
import { KategoriDoa } from './entity/category_doa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doa, KategoriDoa])],
  providers: [DoaService],
  controllers: [DoaController],
})
export class DoaModule {}
