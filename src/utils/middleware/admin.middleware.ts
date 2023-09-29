import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization)
      throw new HttpException('Kirimkan Token', HttpStatus.UNAUTHORIZED);
    const token = req.headers.authorization.split(' ')[1];
    const decode: any = this.jwtService.decode(token);
    console.log('decode =>', decode);
    if (decode?.role_id && decode?.role_id?.role_name == 'Admin') {
      next();
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
