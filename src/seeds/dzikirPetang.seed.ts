import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DzikirPetang } from 'src/app/dzikir_pagi_petang/entity/dzikir_petang.entity';
import { dataPetang } from 'src/utils/json/dzikirPetang';
import { Repository } from 'typeorm';

@Injectable()
export class DzikirPetangSeeder {
  constructor(
    @InjectRepository(DzikirPetang)
    private readonly dzikirPetangRepository: Repository<DzikirPetang>,
  ) {}

  async create() {
    const dzikirData = dataPetang.data;

    for (const data of dzikirData) {
      const { title, arab, arti, diBaca, narrator } = data;
      const check = await this.dzikirPetangRepository.findOne({
        where: {
          title,
          arab,
          narrator,
          arti,
          diBaca,
        },
      });
      if (!check) {
        const dzikirPetang = this.dzikirPetangRepository.create(data);
        await this.dzikirPetangRepository.save(dzikirPetang);
      }
    }
  }
}
