import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from 'src/app/auth/entity/admin.entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class AdminSeeder {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(): Promise<any> {
    const adminsData = [
      {
        username: 'admin umrah',
        email: 'adminumrah@gmail.com',
        password: hashSync('adminumrah123', 10),
      },
      // Tambahkan data lainnya sesuai kebutuhan
    ];
    adminsData.map(async (data) => {
      const email: string = data.email;
      const check = this.adminRepository.findOne({
        where: {
          email,
        },
      });
      if (!check) {
        const admin = this.adminRepository.create(adminsData);
        await this.adminRepository.save(admin);
      }
    });
  }
}
