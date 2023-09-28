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
    const { id } = req.user;
    console.log('userid =>', id);
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

  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Req() req) {
    // hasil validate dari jwt strategy akan ditambakan pada req.user. isi object req.user akan sama dengan payload dari jwt token. Silahkan coba console.log(req.user)
    const { id } = req.user;
    return this.adminService.myProfile(id);
  }

  @UseGuards(JwtGuard)
  @FileInterceptorCustom('file_update', 'admin')
  @Put('edit-profile')
  async editProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateAdminDto,
    @Req() req,
  ) {
    const { id } = req.user;
    return this.adminService.editProfile(file, payload, +id);
  }
}
