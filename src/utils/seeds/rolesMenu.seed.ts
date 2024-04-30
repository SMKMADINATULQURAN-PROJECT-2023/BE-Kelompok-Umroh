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
        menu_name: 'Admin',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Artikel',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Doa',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Dzikir',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Lokasi Ziarah',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Panduan',
        permission: 'Create, Read, Update, Delete',
      },
      {
        menu_name: 'Status',
        permission: 'Update',
      },
    ];

    const saveIfNotExist = async (repository, data, condition) => {
      const exist = await repository.findOne({ where: condition });
      if (!exist) {
        const entity = repository.create(data);
        return repository.save(entity);
      }
    };

    const menu_id = await Promise.all(
      menusData.map((data) =>
        saveIfNotExist(this.menuRepository, data, {
          menu_name: data.menu_name,
        }),
      ),
    );

    const rolesData = [
      {
        role_name: UserRole.SUPERADMIN,
        menus: menu_id,
      },
    ];

    for (const data of rolesData) {
      await saveIfNotExist(
        this.roleRepository,
        { role_name: data.role_name, ...data.menus },
        { role_name: data.role_name },
      );
    }
  }
}
