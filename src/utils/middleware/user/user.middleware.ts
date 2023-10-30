import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) throw new UnauthorizedException();
    const token = req.headers.authorization.split(' ')[1];
    const decode: any = this.jwtService.decode(token);
    console.log('decode user =>', decode);
    if (decode?.role_id?.role_name == 'Admin' || decode?.role_id == 'User') {
      next();
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
