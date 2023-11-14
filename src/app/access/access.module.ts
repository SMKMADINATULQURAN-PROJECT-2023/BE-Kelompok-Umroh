import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './entity/access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
