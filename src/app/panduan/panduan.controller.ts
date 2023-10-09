import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PanduanService } from './panduan.service';
import { CreatePanduanDto, FindPanduanDto } from './dto/panduan.dto';
import { UpdatePanduanDto } from './dto/panduan.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';

@UseGuards(JwtGuard)
@Controller('panduan')
export class PanduanController {
  constructor(private readonly panduanService: PanduanService) {}

  @Post('create')
  @FileInterceptorCustom('file_create', 'panduan')
  create(
    @Body() payload: CreatePanduanDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.panduanService.create(payload, file);
  }

  @Get()
  findAll(@Pagination() query: FindPanduanDto) {
    return this.panduanService.findAll(query);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.panduanService.findOne(slug);
  }

  @Put('update/:slug')
  update(@Param('slug') slug: string, @Body() payload: UpdatePanduanDto) {
    return this.panduanService.update(slug, payload);
  }

  @Delete('delete/:slug')
  remove(@Param('slug') slug: string) {
    return this.panduanService.remove(slug);
  }
}
