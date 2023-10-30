import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) throw new UnauthorizedException();
    const token = req.headers.authorization.split(' ')[1];
    const decode: any = this.jwtService.decode(token);
    console.log('decode =>', decode);
    if (decode?.role_id?.role_name == 'Admin') {
      next();
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
