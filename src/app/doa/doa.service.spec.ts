import { Test, TestingModule } from '@nestjs/testing';
import { DoaService } from './doa.service';

describe('DoaService', () => {
  let service: DoaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoaService],
    }).compile();

    service = module.get<DoaService>(DoaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
