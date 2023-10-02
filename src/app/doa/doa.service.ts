import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import {
  CreateDoaDto,
  CreateKategoriDto,
  UpdateDoaDto,
  UpdateKategoriDto,
} from './doa.dto';
import { Doa } from './entity/doa.entity';
import { KategoriDoa } from './entity/category_doa.entity';
import { ConvertSlugService } from 'src/utils/service/convert_slug/convert_slug.service';

@Injectable()
export class DoaService extends BaseResponse {
  constructor(
    @InjectRepository(Doa) private readonly doaRepo: Repository<Doa>,
    @InjectRepository(KategoriDoa)
    private readonly kategoriRepo: Repository<KategoriDoa>,
    private slug: ConvertSlugService,
  ) {
    super();
  }

  async createDoa(payload: CreateDoaDto): Promise<ResponseSuccess> {
    const checkKategori = await this.kategoriRepo.findOne({
      where: {
        id: payload.kategori_id,
      },
    });
    if (!checkKategori)
      throw new NotFoundException('Kategori Doa Tidak Ditemukan');

    payload.slug = this.slug.slugify(payload.name);
    await this.doaRepo.save({
      ...payload,
      kategori_id: { id: payload.kategori_id },
    });

    return this._success('Berhasil Membuat Doa');
  }

  async getKategori(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.kategoriRepo.find({
      skip: limit,
      take: pageSize,
      relations: ['doa_id'],
    });
    const total = await this.kategoriRepo.count();
    return this._pagination(
      'Berhasil Menemukan Kategori Doa',
      result,
      total,
      page,
      pageSize,
    );
  }
  async getDoa(query: PageRequestDto): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const result = await this.doaRepo.find({
      skip: limit,
      take: pageSize,
      relations: ['kategori_id'],
    });
    const total = await this.doaRepo.count();
    return this._pagination(
      'Berhasil Menemukan Doa',
      result,
      total,
      page,
      pageSize,
    );
  }

  async createKategoriDoa(payload: CreateKategoriDto) {
    payload.slug = this.slug.slugify(payload.kategori_name);
    await this.kategoriRepo.save(payload);
    return this._success('Berhasil Menyimpan Kategori Doa');
  }

  async updateDoa(
    slug: string,
    payload: UpdateDoaDto,
  ): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    if (payload.name !== undefined) {
      payload.slug = this.slug.slugify(payload.name);
    }
    await this.doaRepo.save({
      ...payload,
      kategori_id: { id: payload.kategori_id },
      slug,
    });
    return this._success('Berhasil Mengupdate Doa');
  }

  async updateKategori(
    slug: string,
    payload: UpdateKategoriDto,
  ): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(`Kategori Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    if (payload.kategori_name !== undefined) {
      payload.slug = this.slug.slugify(payload.kategori_name);
    }
    await this.kategoriRepo.save({
      ...payload,
      slug,
    });
    return this._success('Berhasil Mengupdate Kategori');
  }

  async removeDoa(slug: string): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
    }
    await this.doaRepo.delete(slug);
    return this._success('Berhasil Menghapus Doa');
  }

  async removeKategori(slug: string): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(
        `KategoriDoa Tidak Ditemukan`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.kategoriRepo.delete(slug);
    return this._success('Berhasil Menghapus KategoriDoa');
  }
}
