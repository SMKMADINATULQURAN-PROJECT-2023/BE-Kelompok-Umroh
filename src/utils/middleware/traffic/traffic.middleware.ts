import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traffic } from '../../../app/traffic/entity/traffic.entity';

@Injectable()
export class TrafficMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Traffic)
    private readonly trafficRepo: Repository<Traffic>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const lastVisit = this.trafficRepo.findOne({
      where: { ip: req.ip, original_url: req.originalUrl },
      order: { created_at: 'DESC' },
    });

    lastVisit
      .then((visit) => {
        if (
          visit &&
          new Date().getHours() - new Date(visit.created_at).getHours() < 3
        ) {
          return next();
        } else {
          this.trafficRepo.save({
            user_agent: req.headers['user-agent'],
            ip: req.ip,
            original_url: req.originalUrl,
          });
          return next();
        }
      })
      .catch((error) => {
        console.error(error);
        next(error);
      });
  }
}
