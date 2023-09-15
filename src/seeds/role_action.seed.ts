import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, UserRole } from 'src/app/role/entity/role.entity';
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
    const actionsData = [
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
    const actions = await Promise.all(
      actionsData.map(async (data) => {
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

    // Membuat objek Role dan mengaitkannya dengan Actions yang telah dibuat
    const rolesData = [
      {
        role_name: UserRole.ADMIN,
        actions: actions,
      },
    ];
    for (const data of rolesData) {
      const { role_name, actions } = data;
      const check = await this.roleRepository.findOne({
        where: {
          role_name,
        },
        relations: ['actions'],
      });
      if (!check) {
        const role = this.roleRepository.create({ role_name, actions });
        await this.roleRepository.save(role);
      }
    }
  }
}
