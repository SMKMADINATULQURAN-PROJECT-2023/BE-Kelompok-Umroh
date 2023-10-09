import { HttpException } from '@nestjs/common/exceptions';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doa } from 'src/app/doa/entity/doa.entity';
import { dataDoa } from 'src/utils/json/harian';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { KategoriDoa } from 'src/app/doa/entity/category_doa.entity';

@Injectable()
export class DoaSeeder extends BaseResponse {
  constructor(
    @InjectRepository(Doa) private readonly doaRepo: Repository<Doa>,
    @InjectRepository(KategoriDoa)
    private readonly kategoriDoaRepo: Repository<KategoriDoa>,
  ) {
    super();
  }

  async create() {
    try {
      const kategoriData = [
        {
          kategori_name: 'Makan dan Minum',
        },
      ];

      for (const data of kategoriData) {
        const { kategori_name } = data;

        const check = await this.kategoriDoaRepo.findOne({
          where: {
            kategori_name,
          },
        });

        if (!check) {
          const doa = this.kategoriDoaRepo.create(data);
          await this.kategoriDoaRepo.save(doa);
        }
      }

      const doaData = dataDoa.data;

      for (const data of doaData) {
        const { name, arab, arti, kategori_id } = data;

        const check = await this.doaRepo.findOne({
          where: {
            name,
            arab,
            arti,
          },
          relations: ['kategori_id'],
        });
        if (!check) {
          const doa = this.doaRepo.create({
            ...data,
            kategori_id: { id: kategori_id },
          });
          await this.doaRepo.save(doa);
        }
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
