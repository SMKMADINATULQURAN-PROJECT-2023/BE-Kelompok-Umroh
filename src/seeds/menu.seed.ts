import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/app/menu/entity/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuSeeder {
  constructor(
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async create() {
    const menusData = [
      {
        name: 'Admin',
      },
      {
        name: 'Artikel',
      },
      {
        name: 'Doa',
      },
      {
        name: 'Dzikir',
      },
      {
        name: 'Lokasi Ziarah',
      },
      {
        name: 'Panduan',
      },
    ];
    for (const data of menusData) {
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
    }
  }
}
