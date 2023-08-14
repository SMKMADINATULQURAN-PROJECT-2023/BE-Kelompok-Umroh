import { Test, TestingModule } from '@nestjs/testing';
import { CatatanService } from './catatan.service';

describe('CatatanService', () => {
  let service: CatatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatatanService],
    }).compile();

    service = module.get<CatatanService>(CatatanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
