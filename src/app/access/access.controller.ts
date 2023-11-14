import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccessService } from './access.service';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { AccessDto, FindAccessDto } from './dto/access.dto';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@Controller('access')
export class AccessController {
  constructor(private accessService: AccessService) {}

  @Post('create')
  async create(@InjectCreatedBy() payload: AccessDto) {
    return this.accessService.create(payload);
  }

  @Get('')
  async findAll(@Pagination() query: FindAccessDto) {
    return this.accessService.find(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accessService.findOne(+id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @InjectUpdatedBy() payload: AccessDto) {
    return this.accessService.update(+id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.accessService.delete(+id);
  }
}
