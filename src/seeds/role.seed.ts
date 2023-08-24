import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, UserRole } from 'src/app/auth/entity/role.entity';

@Injectable()
export class RoleSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(): Promise<any> {
    const rolesData = [
      {
        role_name: UserRole.ADMIN,
      },
    ];
    rolesData.map(async (data) => {
      const role = this.roleRepository.create(rolesData);
      await this.roleRepository.save(role);
    });
  }
}
