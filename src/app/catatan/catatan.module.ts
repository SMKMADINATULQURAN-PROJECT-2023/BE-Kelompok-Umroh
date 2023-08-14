import { Module } from '@nestjs/common';
import { CatatanController } from './catatan.controller';
import { CatatanService } from './catatan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catatan } from './catatan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Catatan])],
  controllers: [CatatanController],
  providers: [CatatanService],
})
export class CatatanModule {}
