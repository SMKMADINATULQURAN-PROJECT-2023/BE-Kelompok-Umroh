import { Controller } from '@nestjs/common';
import { DoaService } from './doa.service';
import { Post, Get, Body, Delete, Put } from '@nestjs/common/decorators';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import {
  CreateDoaArrayDto,
  CreateKategoriDto,
  UpdateKategoriDoaDto,
} from './doa.dto';

@Controller('doa')
export class DoaController {
  constructor(private doaService: DoaService) {}

  @Post('create')
  async createDoa(@Body() createDoaDto: CreateDoaArrayDto) {
    return this.doaService.createDoa(createDoaDto);
  }
  @Post('kategori/create')
  async createKategori(@Body() createKategoriDto: CreateKategoriDto) {
    return this.doaService.createKategoriDoa(createKategoriDto);
  }
  @Get()
  async get(@Pagination() query) {
    return this.doaService.get(query);
  }

  @Put('update/:id')
  async updateDoa(id: string, @Body() payload: UpdateKategoriDoaDto) {
    return this.doaService.updateDoa(+id, payload);
  }

  @Put('kategori/update/:id')
  async updateKategoriDoa(id: string, @Body() payload: UpdateKategoriDoaDto) {
    return this.doaService.updateKategori(+id, payload);
  }

  @Delete('delete/:id')
  async removeDoa(id: string) {
    return this.doaService.removeDoa(+id);
  }

  @Delete('kategori/delete/:id')
  async removeKategoriDoa(id: string) {
    return this.doaService.removeKategori(+id);
  }
}
