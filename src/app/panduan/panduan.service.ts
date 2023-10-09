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
import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PanduanService extends BaseResponse {
  constructor(
    @InjectRepository(Panduan)
    private readonly panduanRepo: Repository<Panduan>,
    private cloudinary: CloudinaryService,
  ) {
    super();
  }
  async create(
    payload: CreatePanduanDto,
    file: Express.Multer.File,
  ): Promise<ResponseSuccess> {
    console.log('file video =>', file);
    if (!file?.path) {
      throw new HttpException(
        'Video Tidak boleh kosong',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (file?.mimetype === 'image/mp4' || file?.mimetype === 'image/mkv') {
      const { url, public_id } = await this.cloudinary.uploadVideo(
        file,
        'panduan',
      );
      payload.video = url;
      payload.id_video = public_id;
    } else {
      throw new HttpException(
        ' file harus berekstensi .mp4, .mkv',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.panduanRepo.save(payload);
    return this._success('Berhasil Membuat Panduan');
  }

  async findAll(query: FindPanduanDto): Promise<ResponsePagination> {
    const { page, pageSize, limit, kategori } = query;
    const total = await this.panduanRepo.count();
    const result = await this.panduanRepo.find({
      where: { kategori: kategori },
      take: pageSize,
      skip: limit,
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
    const result = await this.panduanRepo.findOne({ where: { id } });
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
    await this.cloudinary.deleteImage(check.id_video);
    await this.panduanRepo.delete({ id });
    return this._success('Berhasil Menghapus Panduan');
  }
}
