import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailResetPasswordDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendForgotPassword(payload: MailResetPasswordDto) {
    await this.mailService.sendMail({
      to: payload.email, //email yang dituju
      subject: 'Lupa Password', //Subject didalam Email
      template: './lupaPassword', //file template didalam folder templates
      context: {
        link: payload.link,
        username: payload.username,
      },
    });
  }
}
