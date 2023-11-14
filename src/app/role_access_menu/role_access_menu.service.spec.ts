import { Test, TestingModule } from '@nestjs/testing';
import { RoleAccessMenuService } from './role_access_menu.service';

describe('RoleAccessMenuService', () => {
  let service: RoleAccessMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleAccessMenuService],
    }).compile();

    service = module.get<RoleAccessMenuService>(RoleAccessMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
