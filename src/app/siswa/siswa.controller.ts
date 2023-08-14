import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateSiswaArrayDto,
  ImportSiswaDto,
  UpdateSiswaDto,
  findAllSiswaDto,
  findCatatanDto,
} from './siswa.dto';

import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SiswaService } from './siswa.service';
import { query } from 'express';

@UseGuards(JwtGuard)
@Controller('siswa')
export class SiswaController {
  constructor(private siswaService: SiswaService) {}

  //   @Post('create-bulk')
  //   async createBulk(@Body() payload: CreateSiswaArrayDto) {
  //     return this.siswaService.createBulk(payload);
  //   }

  @Get('list')
  async findAll(@Pagination() query: findAllSiswaDto) {
    return this.siswaService.findAll(query);
  }

  @Put('/update/:id')
  async update(
    @InjectUpdatedBy() payload: UpdateSiswaDto,
    @Param('id') id: string,
  ) {
    console.log('payload disini', payload);
    return this.siswaService.update(+id, payload);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: (req, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          cb(null, `${new Date().getTime()}.${fileExtension}`);
        },
      }),
    }),
  )
  @Post('import')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: ImportSiswaDto,
  ) {
    if (payload.secret_key !== process.env.SECRET_KEY) {
      throw new HttpException(
        'SECRET KEY FAIL',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return this.siswaService.importProduk(file.filename);
  }

  @Get('/:id/catatan')
  async catatanSiswa(@Param('id') id: string, @Query() query: findCatatanDto) {
    return this.siswaService.findSiswaCatatan(+id, query);
  }
}
