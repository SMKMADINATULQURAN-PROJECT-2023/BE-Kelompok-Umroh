import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  Put,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto, UpdateArtikelDto } from './dto/artikel.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { JwtGuard } from '../auth/auth.guard';
import { InjectAuthor } from 'src/utils/decorator/author.decorator';

@UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
@Controller('artikel')
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Post('create')
  @FileInterceptorCustom('file_create', 'artikel')
  create(
    @UploadedFile() file: Express.Multer.File,
    @InjectAuthor() createArtikelDto: CreateArtikelDto,
    @Req() req,
  ) {
    const { id } = req.user;
    return this.artikelService.create(createArtikelDto, file, id);
  }

  @Get()
  findAll(@Pagination() query) {
    return this.artikelService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artikelService.findOne(+id);
  }

  @FileInterceptorCustom('file_update', 'artikel')
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateArtikelDto: UpdateArtikelDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.artikelService.update(+id, updateArtikelDto, file);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.artikelService.remove(+id);
  }
}
