import { IsNotEmpty } from 'class-validator';

export class MailResetPasswordDto {
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;
}
