import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DzikirPagi } from 'src/app/dzikir_pagi_petang/entity/dzikir_pagi.entity';
import { dataPagi } from 'src/utils/json/dzikirPagi';
import { Repository } from 'typeorm';

@Injectable()
export class DzikirPagiSeeder {
  constructor(
    @InjectRepository(DzikirPagi)
    private readonly dzikirPagiRepository: Repository<DzikirPagi>,
  ) {}

  async create() {
    const dzikirData = dataPagi.data;

    for (const data of dzikirData) {
      const { title, arab, arti, diBaca, narrator } = data;
      const check = await this.dzikirPagiRepository.findOne({
        where: {
          title,
          arab,
          narrator,
          arti,
          diBaca,
        },
      });
      if (!check) {
        const dzikirPagi = this.dzikirPagiRepository.create(data);
        await this.dzikirPagiRepository.save(dzikirPagi);
      }
    }
  }
}
