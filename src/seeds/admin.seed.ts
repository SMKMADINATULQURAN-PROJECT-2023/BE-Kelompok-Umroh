import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/app/admin/entities/admin.entity';
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
        role_id: { id: 1 },
      },
      // Tambahkan data lainnya sesuai kebutuhan
    ];

    for (const data of adminsData) {
      const email: string = data.email;
      const check = await this.adminRepository.findOne({
        where: {
          email,
        },
      });
      if (!check) {
        const admin = this.adminRepository.create(data);
        await this.adminRepository.save(admin);
      }
    }
  }
}
