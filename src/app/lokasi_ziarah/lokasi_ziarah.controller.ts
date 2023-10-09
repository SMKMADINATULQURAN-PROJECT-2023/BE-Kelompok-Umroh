import {
  Controller,
  Post,
  Get,
  UploadedFile,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { LokasiZiarahService } from './lokasi_ziarah.service';
import {
  CreateZiarahDto,
  FindZiarahDto,
  UpdateZiarahDto,
} from './lokasi_ziarah.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { JwtGuard } from '../auth/auth.guard';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@UseGuards(JwtGuard)
@Controller('lokasi_ziarah')
export class LokasiZiarahController {
  constructor(private ziarahService: LokasiZiarahService) {}

  @Post('create')
  @FileInterceptorCustom('file_create', 'lokasi_ziarah')
  async create(
    @UploadedFile() file: Express.Multer.File, // Sekarang mengimpor UploadedFile dari @nestjs/common
    @InjectCreatedBy() payload: CreateZiarahDto,
  ) {
    console.log(file);
    return this.ziarahService.create(payload, file);
  }

  @Get()
  async get(@Pagination() payload: FindZiarahDto) {
    return this.ziarahService.get(payload);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.ziarahService.remove(+id);
  }

  @Put('update/:id')
  @FileInterceptorCustom('file_update', 'lokasi_ziarah')
  async update(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateZiarahDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return this.ziarahService.update(+id, payload, file);
  }
}
