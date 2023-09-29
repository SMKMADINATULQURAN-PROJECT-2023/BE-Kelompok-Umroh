import { Test, TestingModule } from '@nestjs/testing';
import { ConvertSlugService } from './convert_slug.service';

describe('ConvertSlugService', () => {
  let service: ConvertSlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertSlugService],
    }).compile();

    service = module.get<ConvertSlugService>(ConvertSlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
