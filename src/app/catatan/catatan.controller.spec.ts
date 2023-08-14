import { Test, TestingModule } from '@nestjs/testing';
import { CatatanController } from './catatan.controller';

describe('CatatanController', () => {
  let controller: CatatanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatatanController],
    }).compile();

    controller = module.get<CatatanController>(CatatanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
