import { Body, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import { JwtGuard, JwtGuardRefreshToken } from '../auth/auth.guard';
import { RefreshTokenDto } from '../admin/dto/admin.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Pagination() query: PageRequestDto) {
    return this.userService.findAll(query);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtGuardRefreshToken)
  @Post('refresh-token')
  async refreshToken(@Body() payload: RefreshTokenDto) {
    return this.userService.refreshToken(payload);
  }
}
