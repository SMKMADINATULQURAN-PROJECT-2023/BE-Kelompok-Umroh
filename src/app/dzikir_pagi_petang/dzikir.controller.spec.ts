import { Test, TestingModule } from '@nestjs/testing';
import { DzikirPagiPetangController } from './dzikir_pagi_petang.controller';

describe('DzikirPagiPetangController', () => {
  let controller: DzikirPagiPetangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DzikirPagiPetangController],
    }).compile();

    controller = module.get<DzikirPagiPetangController>(
      DzikirPagiPetangController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
