import { Test, TestingModule } from '@nestjs/testing';
import { DzikirPagiPetangService } from './dzikir_pagi_petang.service';

describe('DzikirPagiPetangService', () => {
  let service: DzikirPagiPetangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DzikirPagiPetangService],
    }).compile();

    service = module.get<DzikirPagiPetangService>(DzikirPagiPetangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
