import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
  getLatihan(): string {
    return 'latihan';
  }
}
