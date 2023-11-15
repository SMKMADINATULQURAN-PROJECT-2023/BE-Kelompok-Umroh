import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type unionType = 'Create' | 'List' | 'Detail' | 'Update' | 'Delete';
export class RoleAccessMenuDto {
  @IsNumber()
  @IsNotEmpty()
  adminId: number;

  @IsNumber()
  @IsNotEmpty()
  menuId: number;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  permission: string;
}
