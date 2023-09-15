import { Test, TestingModule } from '@nestjs/testing';
import { DoaController } from './doa.controller';

describe('DoaController', () => {
  let controller: DoaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoaController],
    }).compile();

    controller = module.get<DoaController>(DoaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
