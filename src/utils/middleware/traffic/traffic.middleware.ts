import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Traffic } from '../../../app/traffic/entity/traffic.entity'; // Update this to the path of your Traffic entity
@Injectable()
export class TrafficMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Traffic)
    private readonly trafficRepo: Repository<Traffic>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const lastVisit = await this.trafficRepo.findOne({
        where: { ip: req.ip, original_url: req.originalUrl },
        order: { created_at: 'DESC' },
      });
      if (
        lastVisit &&
        new Date().getHours() - new Date(lastVisit.created_at).getHours() < 1
      ) {
        return next();
      } else {
        await this.trafficRepo.save({
          user_agent: req.headers['user-agent'],
          ip: req.ip,
          original_url: req.originalUrl,
        });
        return next();
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
