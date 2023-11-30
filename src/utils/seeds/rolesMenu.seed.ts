import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/app/menu/entity/menu.entity';
import { Role } from 'src/app/role/entity/role.entity';
import { UserRole } from 'src/utils/interface';
import { Repository } from 'typeorm';

@Injectable()
export class RolesMenuSeeder {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create() {
    const menusData = [
      {
        name: 'Admin',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
      {
        name: 'Artikel',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
      {
        name: 'Doa',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
      {
        name: 'Dzikir',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
      {
        name: 'Lokasi Ziarah',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
      {
        name: 'Panduan',
        created_by: { id: 1 },
        permission: 'Create, Read, Update, Delete',
      },
    ];
    const menu_id = await Promise.all(
      menusData.map(async (data) => {
        const name: string = data.name;
        const check = await this.menuRepository.findOne({
          where: {
            name: name,
          },
        });
        if (!check) {
          const menu = this.menuRepository.create(data);
          await this.menuRepository.save(menu);
        }
      }),
    );

    const rolesData = [
      {
        role_name: UserRole.ADMIN,
        menus: menu_id,
      },
      {
        role_name: UserRole.CONTENTCREATOR,
        menus: menusData[1],
      },
    ];
    for (const data of rolesData) {
      const { role_name, menus } = data;
      const check = await this.roleRepository.findOne({
        where: {
          role_name,
        },
        relations: ['action_id'],
      });
      if (!check) {
        const role = this.roleRepository.create({ role_name, ...menus });
        await this.roleRepository.save(role);
      }
    }
  }
}
