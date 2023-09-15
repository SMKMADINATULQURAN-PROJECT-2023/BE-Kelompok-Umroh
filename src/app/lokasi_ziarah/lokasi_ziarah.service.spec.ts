import { Test, TestingModule } from '@nestjs/testing';
import { LokasiZiarahService } from './lokasi_ziarah.service';

describe('LokasiZiarahService', () => {
  let service: LokasiZiarahService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LokasiZiarahService],
    }).compile();

    service = module.get<LokasiZiarahService>(LokasiZiarahService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
