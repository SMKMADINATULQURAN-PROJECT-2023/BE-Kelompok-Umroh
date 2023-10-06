import { HttpException } from '@nestjs/common/exceptions';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doa } from 'src/app/doa/entity/doa.entity';
import { dataDoa } from 'src/utils/json/harian';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface';
import BaseResponse from 'src/utils/response/base.response';
import { ConvertSlugService } from 'src/utils/service/convert_slug/convert_slug.service';

@Injectable()
export class DoaSeeder extends BaseResponse {
  constructor(
    @InjectRepository(Doa) private readonly doaRepo: Repository<Doa>,
    private slug: ConvertSlugService,
  ) {
    super();
  }

  async create() {
    try {
      const doaData = dataDoa.data;
      for (const data of doaData) {
        const { name, arab, arti, kategori_id, slug } = data;

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
          data.slug = this.slug.slugify(data.name);
          await this.doaRepo.save(doa);
        }
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
  }
}
