import { Put, UploadedFile } from '@nestjs/common/decorators';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import {
  LoginDto,
  LoginGoogleDto,
  RegisterDto,
  ResetPasswordDto,
  updateProfileDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';
import { FileInterceptorCustom } from 'src/utils/decorator/fileInterceptor.decorator';
import { UpdateAdminDto } from '../admin/dto/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ** User =================================
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('login-google')
  async googleLogin(@Body() payload: LoginGoogleDto) {
    return this.authService.loginGoogle(payload);
  }

  @Post('lupa-password')
  async forgotPassowrd(@Body('telephone') telephone: string) {
    console.log('telephone', telephone);
    return this.authService.forgotPassword(telephone);
  }

  @Post('reset-password/:telephone/:otp')
  async resetPassword(
    @Param('telephone') telephone: string,
    @Param('otp') otp: string,
    @Body() payload: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(telephone, +otp, payload);
  }

  @UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
  @Get('profile')
  async profile(@Req() req) {
    // hasil validate dari jwt strategy akan ditambakan pada req.user. isi object req.user akan sama dengan payload dari jwt token. Silahkan coba console.log(req.user)
    const { id } = req.user;

    return this.authService.profile(id);
  }

  @UseGuards(JwtGuard)
  @Put('update-profile')
  @FileInterceptorCustom('file_update', 'user')
  async editProfile(
    @Req() req,
    @Body() payload: updateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { id } = req.user;
    return this.authService.updateProfile(payload, file, id);
  }

  @UseGuards(JwtGuard)
  @Put('update-password')
  async updatePassword(@Body() payload: ResetPasswordDto, @Req() req) {
    const { id } = req.user;
    return this.authService.updatePassword(payload, id);
  }

  // ** Admin =================================
  @UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
  @Get('profile-admin')
  async adminProfile(@Req() req) {
    // hasil validate dari jwt strategy akan ditambakan pada req.user. isi object req.user akan sama dengan payload dari jwt token. Silahkan coba console.log(req.user)
    const { id } = req.user;
    return this.authService.adminProfile(id);
  }

  @UseGuards(JwtGuard)
  @FileInterceptorCustom('file_edit_profile', 'admin')
  @Put('update-profile-admin')
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UpdateAdminDto,
    @Req() req,
  ) {
    const { id, refresh_token } = req.user;
    console.log(refresh_token);
    return this.authService.updateProfileAdmin(
      file,
      payload,
      id,
      refresh_token,
    );
  }
}
