import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Role } from '../role/entity/role.entity';
import { Action } from '../action/entity/action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Role, Action])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
