import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { PageRequestDto } from 'src/utils/dto/page.dto';
import {
  CreateDoaArrayDto,
  CreateKategoriDto,
  UpdateKategoriDoaDto,
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

  async createDoa(createDoaDto: CreateDoaArrayDto): Promise<ResponseSuccess> {
    try {
      let berhasil = 0;
      let gagal = 0;
      await Promise.all(
        createDoaDto.data.map(async (data) => {
          const dataSave = {
            ...data,
            kategori_id: { id: data.kategori_id },
          };
          data.slug = this.slug.slugify(data.name);
          try {
            await this.doaRepo.save(dataSave);
            berhasil += 1;
          } catch (error) {
            gagal += 1;
            console.log('Gagal =>', gagal);
          }
        }),
      );
      return this._success(
        `Berhasil Membuat Doa ${berhasil} dan gagal ${gagal}  `,
      );
    } catch (error) {
      console.error(error);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
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
    payload: UpdateKategoriDoaDto,
  ): Promise<ResponseSuccess> {
    const check = await this.doaRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(`Doa Tidak Ditemukan`, HttpStatus.NOT_FOUND);
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
    payload: UpdateKategoriDoaDto,
  ): Promise<ResponseSuccess> {
    const check = await this.kategoriRepo.findOne({
      where: { slug: slug },
    });
    if (!check) {
      throw new HttpException(`Kategori Tidak Ditemukan`, HttpStatus.NOT_FOUND);
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
