import { Module } from '@nestjs/common';
import { RoleAccessMenuController } from './role_access_menu.controller';
import { RoleAccessMenuService } from './role_access_menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entity/role.entity';
import { Menu } from '../menu/entity/menu.entity';
import { RolesAccessMenus } from './entity/role_access_menu.entity';
import { Admin } from '../admin/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Role, Menu, RolesAccessMenus])],
  controllers: [RoleAccessMenuController],
  providers: [RoleAccessMenuService],
})
export class RoleAccessMenuModule {}
