import { Delete, Param, Put } from '@nestjs/common/decorators';
import { Controller, Body, Post, Get } from '@nestjs/common';

import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { ActionService } from './action.service';
import { CreateActionDto, UpdateActionDto } from './dto/action.dto';

@Controller('action')
export class ActionController {
  constructor(private actionService: ActionService) {}

  @Post('create')
  async create(@Body() payload: CreateActionDto) {
    return this.actionService.create(payload);
  }

  @Get('list')
  async get(@Pagination() query) {
    return this.actionService.get(query);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateActionDto) {
    return this.actionService.update(+id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.actionService.delete(+id);
  }
}
