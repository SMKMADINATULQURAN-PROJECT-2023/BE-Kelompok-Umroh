import { IsOptional, IsString } from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';

export class FindUserDto extends PageRequestDto {
  @IsOptional()
  @IsString()
  keyword: string;
}
