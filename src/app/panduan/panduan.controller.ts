import {
  Controller,
  Get,
  Post,
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
import { InjectCreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { InjectUpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';

@UseGuards(JwtGuard)
@Controller('panduan')
export class PanduanController {
  constructor(private readonly panduanService: PanduanService) {}

  @Get()
  findAll(@Pagination() query: FindPanduanDto) {
    return this.panduanService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panduanService.findOne(+id);
  }

  @Post('create')
  @FileInterceptorCustom('file_create', 'panduan')
  create(@InjectCreatedBy() payload: CreatePanduanDto) {
    return this.panduanService.create(payload);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @InjectUpdatedBy() payload: UpdatePanduanDto,
  ) {
    return this.panduanService.update(+id, payload);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.panduanService.remove(+id);
  }
}
