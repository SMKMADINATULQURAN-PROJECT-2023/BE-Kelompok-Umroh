import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFile,
  Put,
  Param,
  Delete,
} from '@nestjs/common';

import { LokasiZiarahService } from './lokasi_ziarah.service';
import {
  CreateZiarahDto,
  FindZiarahDto,
  UpdateZiarahDto,
} from './lokasi_ziarah.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';

@Controller('lokasi_ziarah')
export class LokasiZiarahController {
  constructor(private ziarahService: LokasiZiarahService) {}

  @Post('create')
  @FileInterceptorCustom('file_create', 'lokasi_ziarah')
  async create(
    @UploadedFile() file: Express.Multer.File, // Sekarang mengimpor UploadedFile dari @nestjs/common
    @Body() payload: CreateZiarahDto,
  ) {
    console.log(file);
    return this.ziarahService.create(payload, file);
  }

  @Get()
  async get(@Pagination() payload: FindZiarahDto) {
    return this.ziarahService.get(payload);
  }

  @Delete('delete/:slug')
  async remove(@Param('slug') slug: string) {
    return this.ziarahService.remove(slug);
  }

  @Put('update/:slug')
  @FileInterceptorCustom('file_update', 'lokasi_ziarah')
  async update(
    @Param('slug') slug: string,
    @Body() payload: UpdateZiarahDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.ziarahService.update(slug, payload, file);
  }
}
