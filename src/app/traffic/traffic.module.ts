import { Module } from '@nestjs/common';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traffic } from './entity/traffic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Traffic])],
  controllers: [TrafficController],
  providers: [TrafficService],
})
export class TrafficModule {}
