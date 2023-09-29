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
import { JwtGuard } from '../auth/auth.guard';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { LoginAdminDto } from '../auth/auth.dto';
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  async loginAdmin(@Body() payload: LoginAdminDto) {
    return this.adminService.loginAdmin(payload);
  }

  @UseGuards(JwtGuard)
  @Post('refresh-token')
  async refresh_token(@Body() payload: RefreshTokenDto) {
    return this.adminService.refreshToken(payload);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() payload: CreateAdminDto) {
    return this.adminService.create(payload);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Pagination() query: FindAdminDto, @Req() req) {
    const { slug } = req.user;
    console.log('userslug =>', slug);
    return this.adminService.findAll(query, slug);
  }

  @UseGuards(JwtGuard)
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.adminService.findOne(slug);
  }

  @UseGuards(JwtGuard)
  @Put('update/:slug')
  update(@Param('slug') slug: string, @Body() payload: UpdateAdminDto) {
    return this.adminService.update(slug, payload);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:slug')
  remove(@Param('slug') slug: string) {
    return this.adminService.remove(slug);
  }

  @UseGuards(JwtGuard)
  @Get('profile/:slug')
  async profile(@Param('slug') slug: string) {
    return this.adminService.profileAdmin(slug);
  }

  @UseGuards(JwtGuard)
  @FileInterceptorCustom('file_update', 'admin')
  @Put('edit-profile')
  async editProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateAdminDto,
    @Req() req,
  ) {
    const { slug } = req.user;
    return this.adminService.editProfile(file, payload, slug);
  }
}
