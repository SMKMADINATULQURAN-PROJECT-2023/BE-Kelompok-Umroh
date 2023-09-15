import {
  Controller,
  Post,
  Body,
  UploadedFile,
  Get,
  UseInterceptors,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateGaleriDto } from './galery.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { Request } from 'express';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('galeri')
export class GaleriController {
  constructor(private galeriService: GaleriService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: (req: Request, file, cb) => {
          const fileExtension = file.originalname.split('.').pop();
          cb(null, `${new Date().getTime()}.${fileExtension}`);
        },
      }),
    }),
  )
  @Post('create')
  async create(@UploadedFile() file: Express.Multer.File, @Body() payload) {
    if (!file) {
      return new HttpException(
        'thumbnail should not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.galeriService.create(payload, file);
  }

  @Get('list')
  async get(@Pagination() query: PageRequestDto) {
    return this.galeriService.get(query);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, payload: UpdateGaleriDto) {
    return this.galeriService.update(+id, payload);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.galeriService.remove(+id);
  }
}
