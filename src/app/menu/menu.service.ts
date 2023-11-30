import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Menu } from './entity/menu.entity';
import { Repository } from 'typeorm';
import { ResponsePagination, ResponseSuccess } from 'src/utils/interface';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService extends BaseResponse {
  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {
    super();
  }

  async create(payload: CreateMenuDto): Promise<ResponseSuccess> {
    await this.menuRepo.save(payload);
    return this._success('Berhasil Membuat Menu');
  }

  async findAll(query): Promise<ResponsePagination> {
    const { page, pageSize, limit } = query;
    const [result, count] = await this.menuRepo.findAndCount({
      take: pageSize,
      skip: limit,
    });
    return this._pagination(
      'Berhasil Menemukan Menu',
      result,
      count,
      page,
      pageSize,
    );
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const check = await this.menuRepo.findOne({
      where: { id: id },
    });
    if (!check) throw new NotFoundException('Menu Tidak Ditemukan');
    return this._success('Berhasil Menemukan Menu', check);
  }

  async update(id: number, payload: UpdateMenuDto): Promise<ResponseSuccess> {
    const check = await this.menuRepo.findOne({
      where: { id: id },
    });
    if (!check) throw new NotFoundException('Menu Tidak Ditemukan');
    const checkMenuName = await this.menuRepo.findOne({
      where: {
        id: id,
        name: payload.name,
      },
    });
    if (!checkMenuName)
      throw new HttpException('Menu Sudah Digunakan', HttpStatus.BAD_REQUEST);
    await this.menuRepo.save(payload);
    return this._success('Berhasil Mengupdate Menu');
  }

  async delete(id: number): Promise<ResponseSuccess> {
    const check = await this.menuRepo.findOne({
      where: { id: id },
    });
    if (!check) throw new NotFoundException('Menu Tidak Ditemukan');
    await this.menuRepo.delete(id);
    return this._success('Berhasil Mengupdate Menu');
  }
}
