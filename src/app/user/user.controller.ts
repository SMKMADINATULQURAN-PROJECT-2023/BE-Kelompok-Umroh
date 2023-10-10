import { Param, UseGuards } from '@nestjs/common/decorators';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Pagination() query: PageRequestDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
