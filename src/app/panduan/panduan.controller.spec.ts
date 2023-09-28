import { Test, TestingModule } from '@nestjs/testing';
import { PanduanController } from './panduan.controller';
import { PanduanService } from './panduan.service';

describe('PanduanController', () => {
  let controller: PanduanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanduanController],
      providers: [PanduanService],
    }).compile();

    controller = module.get<PanduanController>(PanduanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
