import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/app/role/entity/role.entity';
import { UserRole } from 'src/interface';
import { Action } from 'src/app/action/entity/action.entity';

@Injectable()
export class RoleActionSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Action)
    private readonly actionRepository: Repository<Action>,
  ) {}

  async create(): Promise<any> {
    const action_idData = [
      {
        action_name: 'Dashboard',
        description: 'dapat mengakses dashboard',
      },
      {
        action_name: 'Create Update Delete',
        description: 'dapat menbuat mendelete mengupdate data',
      },
    ];

    // Membuat dan menyimpan objek Action
    const action_id = await Promise.all(
      action_idData.map(async (data) => {
        const { action_name, description } = data;
        const check = await this.actionRepository.findOne({
          where: {
            action_name,
            description,
          },
        });
        if (!check) {
          const action = this.actionRepository.create(data);
          return await this.actionRepository.save(action);
        }
      }),
    );

    // Membuat objek Role dan mengaitkannya dengan Action_id yang telah dibuat
    const rolesData = [
      {
        role_name: UserRole.ADMIN,
        action_id: action_id,
      },
    ];
    for (const data of rolesData) {
      const { role_name, action_id } = data;
      const check = await this.roleRepository.findOne({
        where: {
          role_name,
        },
        relations: ['action_id'],
      });
      if (!check) {
        const role = this.roleRepository.create({ role_name, action_id });
        await this.roleRepository.save(role);
      }
    }
  }
}
