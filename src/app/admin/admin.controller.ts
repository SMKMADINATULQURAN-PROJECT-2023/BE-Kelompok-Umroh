import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, UpdateAdminDto } from './dto/admin.dto';

import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create')
  create(@Body() payload: CreateAdminDto) {
    return this.adminService.create(payload);
  }

  @Get('list')
  async findAll(@Pagination() query, @Request() req) {
    const userId = req.user.id;
    console.log(userId);
    return this.adminService.findAll(query, userId);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() payload: UpdateAdminDto) {
    return this.adminService.update(+id, payload);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
