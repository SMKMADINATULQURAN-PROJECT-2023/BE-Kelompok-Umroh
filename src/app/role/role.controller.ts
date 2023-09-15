import { Controller, Body } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  async create(@Body() payload) {
    return this.roleService.create(payload);
  }
}
