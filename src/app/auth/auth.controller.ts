import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    // if (payload.secret_key !== process.env.SECRET_KEY) {
    //   throw new HttpException(
    //     'SECRET KEY FAIL',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    return this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('google-login')
  async googleLogin(@Body() email: string) {
    return this.authService.loginGoogle(email);
  }

  @UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
  @Get('profile')
  async profile(@Req() req) {
    // hasil validate dari jwt strategy akan ditambakan pada req.user. isi object req.user akan sama dengan payload dari jwt token. Silahkan coba console.log(req.user)
    const { id } = req.user;
    return this.authService.profile(id);
  }

  @UseGuards(JwtGuard) // impelementasi guard pada route , hal ini berarti endpoint profile hanya bisa diakses jika client membawa token
  @Get('profile-admin')
  async adminProfile(@Req() req) {
    // hasil validate dari jwt strategy akan ditambakan pada req.user. isi object req.user akan sama dengan payload dari jwt token. Silahkan coba console.log(req.user)
    const { id } = req.user;
    return this.authService.adminProfile(id);
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
}
