import { Test, TestingModule } from '@nestjs/testing';
import { LokasiZiarahController } from './lokasi_ziarah.controller';

describe('LokasiZiarahController', () => {
  let controller: LokasiZiarahController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LokasiZiarahController],
    }).compile();

    controller = module.get<LokasiZiarahController>(LokasiZiarahController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
