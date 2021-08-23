import config, { sender } from '@infra/mail';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { IMailService, IMessage } from '@user/services/mail';

export class MailTrapMailService implements IMailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(config);
  }

  async sendMail(message: IMessage): Promise<void> {
    const { to, subject, body, isNoReply } = message;

    let from = {
      name: sender.name,
      address: sender.email
    };

    /* If it's no reply e-mail, mutate the from variable to contain no reply information */
    if (isNoReply) {
      from = {
        name: sender.noReply.name,
        address: sender.noReply.email
      };
    }

    /* send the e-mail */
    // await this.transporter.sendMail({
    //   to: {
    //     name: to.name,
    //     address: to.email
    //   },

    //   from,
    //   subject,

    //   /* the html here should be the path */
    //   html: body
    // });
  }
}
