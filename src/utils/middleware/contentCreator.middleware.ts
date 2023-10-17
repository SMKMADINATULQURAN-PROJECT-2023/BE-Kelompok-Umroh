/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentCreatorMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) throw new UnauthorizedException();
    const token = req.headers.authorization.split(' ')[1];
    const decode: any = this.jwtService.decode(token);
    console.log(decode);
    if (
      !decode?.role_id ||
      decode?.role_id?.role_name == 'Admin' ||
      decode?.role_id?.role_name == 'Content Creator'
    ) {
      next();
    } else {
      throw new HttpException(
        'Anda Tidak Memiliki Izin Untuk Mengakses Sumber Daya Ini.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
