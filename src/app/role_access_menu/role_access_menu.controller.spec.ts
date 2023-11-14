import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccessMenuController } from './role_access_menu.controller';

describe('RoleAccessMenuController', () => {
  let controller: RoleAccessMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleAccessMenuController],
    }).compile();

    controller = module.get<RoleAccessMenuController>(RoleAccessMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
