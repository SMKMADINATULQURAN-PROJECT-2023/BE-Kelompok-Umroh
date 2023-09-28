import { Test, TestingModule } from '@nestjs/testing';
import { PanduanService } from './panduan.service';

describe('PanduanService', () => {
  let service: PanduanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanduanService],
    }).compile();

    service = module.get<PanduanService>(PanduanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
