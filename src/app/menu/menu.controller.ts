import { Controller, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Post('create')
  async create(@InjectCreatedBy() payload: CreateMenuDto) {
    return this.menuService.create(payload);
  }

  @Get()
  async findAll(@Pagination() query) {
    return this.menuService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateMenuDto,
  ) {
    return this.menuService.update(+id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.menuService.delete(+id);
  }
}
