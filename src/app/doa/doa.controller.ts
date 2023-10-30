import { Controller } from '@nestjs/common';
import { DoaService } from './doa.service';
import {
  Post,
  Get,
  Delete,
  Put,
  UseGuards,
  UploadedFile,
  Param,
} from '@nestjs/common/decorators';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import {
  CreateDoaDto,
  CreateKategoriDto,
  FindDoaDto,
  FindKategoriDto,
  UpdateDoaDto,
  UpdateKategoriDto,
} from './doa.dto';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';
import { JwtGuard } from '../auth/auth.guard';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';

@UseGuards(JwtGuard)
@Controller('doa')
export class DoaController {
  constructor(private doaService: DoaService) {}

  @Post('create')
  async createDoa(@InjectCreatedBy() createDoaDto: CreateDoaDto) {
    return this.doaService.createDoa(createDoaDto);
  }

  @Get()
  async getDoa(@Pagination() query: FindDoaDto) {
    return this.doaService.getDoa(query);
  }

  @Put('update/:id')
  async updateDoa(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateDoaDto,
  ) {
    return this.doaService.updateDoa(+id, payload);
  }

  @Delete('delete/:id')
  async removeDoa(@Param('id') id: string) {
    return this.doaService.removeDoa(+id);
  }

  @Post('kategori/create')
  @FileInterceptorCustom('file_create', 'kategori_doa')
  async createKategori(
    @UploadedFile() file: Express.Multer.File,
    @InjectCreatedBy() createKategoriDto: CreateKategoriDto,
  ) {
    console.log(file);
    return this.doaService.createKategori(createKategoriDto, file);
  }

  @Get('kategori')
  async getKategori(@Pagination() query: FindKategoriDto) {
    return this.doaService.getKategori(query);
  }

  @Put('kategori/update/:id')
  @FileInterceptorCustom('file_update', 'kategori_doa')
  async updateKategoriDoa(
    @InjectUpdatedBy() payload: UpdateKategoriDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.doaService.updateKategori(+id, payload, file);
  }

  @Delete('kategori/delete/:id')
  async removeKategoriDoa(@Param('id') id: string) {
    return this.doaService.removeKategori(+id);
  }

  @Get('kategori/:id')
  async detaiKategoriDoa(@Param('id') id: string) {
    return this.doaService.detailKategori(+id);
  }

  @Get(':id')
  async getDetailDoa(@Param('id') id: string) {
    return this.doaService.detailDoa(+id);
  }
}
