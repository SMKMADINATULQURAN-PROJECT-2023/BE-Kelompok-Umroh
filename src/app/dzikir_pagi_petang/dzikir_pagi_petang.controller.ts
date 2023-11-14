import { Controller, Get, UseGuards } from '@nestjs/common';
import { DzikirPagiPetangService } from './dzikir_pagi_petang.service';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('dzikir')
export class DzikirPagiPetangController {
  constructor(private dzikirPagiPetangService: DzikirPagiPetangService) {}

  @Get('pagi')
  async getDzikirPagi(@Pagination() query) {
    return this.dzikirPagiPetangService.getDzikirPagi(query);
  }

  @Get('petang')
  async getDzikirPetang(@Pagination() query) {
    return this.dzikirPagiPetangService.getDzikirPetang(query);
  }
}
