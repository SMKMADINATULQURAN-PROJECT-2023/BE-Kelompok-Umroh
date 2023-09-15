import { Controller, Get, Post, Query } from '@nestjs/common';

import { CatatanService } from './catatan.service';
import { CreateCatatanDto, findAllCatatanDto } from './catatan.dto';
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';

@Controller('catatan')
export class CatatanController {
  constructor(private catatanService: CatatanService) {}
  @Post('tambah')
  async create(@InjectCreatedBy() payload: CreateCatatanDto) {
    return this.catatanService.create(payload);
  }

  @Get('list')
  async list(@Query() query: findAllCatatanDto) {
    return this.catatanService.findAll(query);
  }
}
