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

  // ** Doa =================================
  @Post('create')
  async createDoa(@InjectCreatedBy() createDoaDto: CreateDoaDto) {
    return this.doaService.createDoa(createDoaDto);
  }

  @Get()
  async getDoa(@Pagination() query) {
    return this.doaService.getDoa(query);
  }

  @Put('update/:id')
  async updateDoa(id: string, @InjectUpdatedBy() payload: UpdateDoaDto) {
    return this.doaService.updateDoa(+id, payload);
  }

  @Delete('delete/:id')
  async removeDoa(id: string) {
    return this.doaService.removeDoa(+id);
  }

  @Get(':id')
  async detailDoa(@Param('id') id: string) {
    return this.doaService.detailDoa(+id);
  }

  // ** Kategori =================================
  @Post('kategori/create')
  @FileInterceptorCustom('file_create', 'kategori_doa')
  async createKategori(
    @InjectCreatedBy() createKategoriDto: CreateKategoriDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doaService.createKategori(createKategoriDto, file);
  }

  @Get('kategori')
  async getKategori(@Pagination() query) {
    return this.doaService.getKategori(query);
  }

  @Put('kategori/update/:id')
  @FileInterceptorCustom('file_update', 'kategori_doa')
  async updateKategoriDoa(
    id: string,
    @InjectUpdatedBy() payload: UpdateKategoriDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.doaService.updateKategori(+id, payload, file);
  }

  @Delete('kategori/delete/:id')
  async removeKategoriDoa(id: string) {
    return this.doaService.removeKategori(+id);
  }

  @Get(':id')
  async detaiKategoriDoa(@Param('id') id: string) {
    return this.doaService.detailKategori(+id);
  }
}
