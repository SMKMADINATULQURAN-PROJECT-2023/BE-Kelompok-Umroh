import { IsOptional, IsString } from 'class-validator';
import { IsUnique } from 'src/utils/validator/unique.validator';
import { Access } from '../entity/access.entity';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class AccessDto {
  @IsUnique([Access, 'name'])
  @IsString()
  name: string;
}

export class FindAccessDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  keyword: string;
}
