import { Controller } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { Get, Post, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('traffic')
export class TrafficController {
  constructor(private trafficService: TrafficService) {}

  @Post('create')
  async create() {
    return this.trafficService.create();
  }

  @Get()
  async get() {
    return this.trafficService.totalPengunjung();
  }
}
