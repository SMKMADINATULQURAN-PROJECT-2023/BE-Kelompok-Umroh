import { Delete, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { Controller, Body, Post, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('create')
  async create(@Body() payload: CreateRoleDto) {
    return this.roleService.create(payload);
  }

  @Get('list')
  async get(@Pagination() query) {
    return this.roleService.get(query);
  }
  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return this.roleService.detail(+id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateRoleDto) {
    return this.roleService.update(+id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(+id);
  }
}
