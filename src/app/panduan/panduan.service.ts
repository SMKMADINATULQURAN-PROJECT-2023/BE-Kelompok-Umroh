import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreatePanduanDto, FindPanduanDto } from './dto/panduan.dto';
import { UpdatePanduanDto } from './dto/panduan.dto';
import BaseResponse from 'src/utils/response/base.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Panduan } from './entities/panduan.entity';
import { Like, Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { Status } from 'src/interface/status.interface';

@Injectable()
export class PanduanService extends BaseResponse {
  constructor(
    @InjectRepository(Panduan)
    private readonly panduanRepo: Repository<Panduan>,
  ) {
    super();
  }
  async create(payload: CreatePanduanDto): Promise<ResponseSuccess> {
    await this.panduanRepo.save(payload);
    return this._success('Berhasil Membuat Panduan');
  }

  async findAll(query: FindPanduanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, gender, kategori_panduan } = query;
    const filterQuery = {};

    if (gender) {
      filterQuery['gender'] = Like(`${gender}`);
    }
    if (kategori_panduan) {
      filterQuery['kategori_panduan'] = Like(`${kategori_panduan}`);
    }

    const total = await this.panduanRepo.count({
      where: filterQuery,
    });
    const result = await this.panduanRepo.find({
      where: filterQuery,
      take: pageSize,
      skip: limit,
      select: {
        created_by: {
          id: true,
          avatar: true,
          username: true,
        },
        updated_by: {
          id: true,
          avatar: true,
          username: true,
        },
      },
      relations: ['created_by', 'updated_by'],
    });
    return this._pagination(
      'Berhasil Menemukan Panduan',
      result,
      total,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const result = await this.panduanRepo.findOne({
      where: { id },
      select: {
        created_by: {
          id: true,
          avatar: true,
          username: true,
        },
        updated_by: {
          id: true,
          avatar: true,
          username: true,
        },
      },
    });
    if (!result) {
      throw new HttpException(`Panduan Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    return this._success('Berhasil Menemukan Detail Panduan', result);
  }

  async update(
    id: number,
    payload: UpdatePanduanDto,
  ): Promise<ResponseSuccess> {
    const check = await this.panduanRepo.findOne({ where: { id } });
    if (!check) throw new NotFoundException('Panduan Tidak Ditemukan');

    return this._success('Berhasil Mengupdate Panduan');
  }

  async remove(id: number): Promise<ResponseSuccess> {
    const check = await this.panduanRepo.findOne({ where: { id } });
    if (!check) throw new NotFoundException('Panduan Tidak Ditemukan');
    await this.panduanRepo.delete({ id });
    return this._success('Berhasil Menghapus Panduan');
  }
}
