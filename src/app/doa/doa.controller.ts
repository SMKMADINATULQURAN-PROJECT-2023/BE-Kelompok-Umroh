import { Controller } from '@nestjs/common';
import { DoaService } from './doa.service';
import { Post, Get, Delete, Put, UseGuards } from '@nestjs/common/decorators';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import {
  CreateDoaDto,
  CreateKategoriDto,
  UpdateDoaDto,
  UpdateKategoriDto,
} from './doa.dto';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('doa')
export class DoaController {
  constructor(private doaService: DoaService) {}

  @Post('create')
  async createDoa(@InjectCreatedBy() createDoaDto: CreateDoaDto) {
    return this.doaService.createDoa(createDoaDto);
  }
  @Post('kategori/create')
  async createKategori(
    @InjectCreatedBy() createKategoriDto: CreateKategoriDto,
  ) {
    return this.doaService.createKategoriDoa(createKategoriDto);
  }

  @Get()
  async getDoa(@Pagination() query) {
    return this.doaService.getDoa(query);
  }

  @Get('kategori')
  async getKategori(@Pagination() query) {
    return this.doaService.getKategori(query);
  }

  @Put('update/:id')
  async updateDoa(id: string, @InjectUpdatedBy() payload: UpdateDoaDto) {
    return this.doaService.updateDoa(+id, payload);
  }

  @Put('kategori/update/:id')
  async updateKategoriDoa(
    id: string,
    @InjectUpdatedBy() payload: UpdateKategoriDto,
  ) {
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
