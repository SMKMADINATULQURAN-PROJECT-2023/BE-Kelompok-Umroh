import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsInt,
  IsString,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class ActionDto {
  @IsInt()
  id: number;

  @IsString()
  action_name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}

export class CreateActionDto extends OmitType(ActionDto, ['id']) {}
export class UpdateActionDto extends PartialType(ActionDto) {}
