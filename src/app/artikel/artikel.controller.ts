import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  Put,
  Req,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto, UpdateArtikelDto } from './dto/artikel.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { JwtGuard } from '../auth/auth.guard';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';

@UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
@Controller('artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Post('create')
  @FileInterceptorCustom('file_create', 'artikel')
  create(
    @UploadedFile() file: Express.Multer.File,
    @InjectCreatedBy() payload: CreateArtikelDto,
    @Req() req,
  ) {
    if (
      req?.user?.role_id?.role_name == 'Admin' ||
      req?.user?.role_id?.role_name == 'Content Creator'
    ) {
      return this.artikelService.create(payload, file);
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get()
  findAll(@Pagination() query, @Req() req) {
    if (
      req?.user?.role_id?.role_name == 'Admin' ||
      req?.user?.role_id?.role_name == 'Content Creator' ||
      req?.user?.role_id == 'User'
    ) {
      return this.artikelService.findAll(query);
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artikelService.findOne(+id);
  }

  @FileInterceptorCustom('file_update', 'artikel')
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdateArtikelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.artikelService.update(+id, payload, file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.artikelService.remove(+id);
  }

  @Put('update/status/:id')
  async updateStatus(@Param('id') id: string, @Body() payload) {
    return this.artikelService.updateStatus(+id, payload);
  }
}
