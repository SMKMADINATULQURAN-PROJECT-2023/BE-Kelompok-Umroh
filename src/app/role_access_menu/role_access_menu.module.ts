import { Module } from '@nestjs/common';
import { RoleAccessMenuController } from './role_access_menu.controller';
import { RoleAccessMenuService } from './role_access_menu.service';

@Module({
  controllers: [RoleAccessMenuController],
  providers: [RoleAccessMenuService]
})
export class RoleAccessMenuModule {}
