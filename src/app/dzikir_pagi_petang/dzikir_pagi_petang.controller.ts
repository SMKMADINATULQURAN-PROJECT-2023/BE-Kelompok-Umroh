import { Controller, Body, Post, Get } from '@nestjs/common';
import { DzikirPagiPetangService } from './dzikir_pagi_petang.service';
import { CreateDzikirPagiPetangArrayDto } from './dzikir_pagi_petang.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';

@Controller('dzikir')
export class DzikirPagiPetangController {
  constructor(private dzikirPagiPetangService: DzikirPagiPetangService) {}

  // @Post('pagi/create-bulk')
  // async createBulkDzikirPagi(@Body() payload: CreateDzikirPagiPetangArrayDto) {
  //   return this.dzikirPagiPetangService.createBulkDzikirPagi(payload);
  // }

  // @Post('petang/create-bulk')
  // async createBulkDzikirPetang(
  //   @Body() payload: CreateDzikirPagiPetangArrayDto,
  // ) {
  //   return this.dzikirPagiPetangService.createBulkDzikirPetang(payload);
  // }

  @Get('pagi')
  async getDzikirPagi(@Pagination() query) {
    return this.dzikirPagiPetangService.getDzikirPagi(query);
  }

  @Get('petang')
  async getDzikirPetang(@Pagination() query) {
    return this.dzikirPagiPetangService.getDzikirPetang(query);
  }
}
