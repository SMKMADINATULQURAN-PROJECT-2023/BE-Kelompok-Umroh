import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    return this.appService.getHello();
  }

  @Get('list')
  getHello2(): string {
    return `Belajar Routing ${process.env.JWT_SECRET}`;
  }
}
