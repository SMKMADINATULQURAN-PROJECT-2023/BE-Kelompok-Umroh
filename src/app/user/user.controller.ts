import { Param, Put } from '@nestjs/common/decorators';
import { Controller, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(@Pagination() query: PageRequestDto) {
    return this.userService.findAll(query);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.userService.findOne(slug);
  }

  @Put('/edit-profile')
  async editProfile(@Param('slug') slug: string, @Body() payload) {
    return this.userService.editProfile(payload, slug);
  }
}
