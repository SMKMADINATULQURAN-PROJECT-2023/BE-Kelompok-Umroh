import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  CreateAdminDto,
  FindAdminDto,
  RefreshTokenDto,
  UpdateAdminDto,
} from './dto/admin.dto';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { JwtGuard, JwtGuardRefreshToken } from '../auth/auth.guard';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { LoginAdminDto, ResetPasswordDto } from '../auth/auth.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  async loginAdmin(@Body() payload: LoginAdminDto) {
    return this.adminService.loginAdmin(payload);
  }

  @UseGuards(JwtGuardRefreshToken)
  @Post('refresh-token')
  async refresh_token(@Body() payload: RefreshTokenDto) {
    return this.adminService.refreshToken(payload);
  }

  @UseGuards(JwtGuard)
  @FileInterceptorCustom('file_create', 'admin')
  @Post('create')
  create(
    @Body() payload: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.adminService.create(payload, file);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Pagination() query: FindAdminDto, @Req() req) {
    const { id } = req.user;
    return this.adminService.findAll(query, id);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() payload: UpdateAdminDto) {
    return this.adminService.update(+id, payload);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Put('reset-password')
  async resetPassword(@Body() payload: ResetPasswordDto, @Req() req) {
    const { id, token } = req.user;
    return this.adminService.resetPassword(payload, id, token);
  }
}
