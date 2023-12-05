import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ContentCreatorMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthorizedException();

    const token = authorization.split(' ')[1];
    const decode: any = this.jwtService.decode(token);
    console.log('decode Content Creator =>', decode);
    if (decode?.role_id?.role_name === 'Content Creator') {
      next();
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
