import { Module } from '@nestjs/common';
import { DzikirPagiPetangService } from './dzikir_pagi_petang.service';
import { DzikirPagiPetangController } from './dzikir_pagi_petang.controller';
import { DzikirPagi } from './entity/dzikir_pagi.entity';
import { DzikirPetang } from './entity/dzikir_petang.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DzikirPagi, DzikirPetang])],
  providers: [DzikirPagiPetangService],
  controllers: [DzikirPagiPetangController],
})
export class DzikirPagiPetangModule {}
