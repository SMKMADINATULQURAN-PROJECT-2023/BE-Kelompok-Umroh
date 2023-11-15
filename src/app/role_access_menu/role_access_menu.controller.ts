import { Body, Controller, Post } from '@nestjs/common';
import { RoleAccessMenuService } from './role_access_menu.service';
import { RoleAccessMenuDto } from './dto/role_access_menu.dto';

@Controller('role-access-menu')
export class RoleAccessMenuController {
  constructor(private roleAccessMenuService: RoleAccessMenuService) {}

  @Post('create')
  async create(
    @Body()
    payload: RoleAccessMenuDto,
  ) {
    return this.roleAccessMenuService.create(payload);
  }
}
