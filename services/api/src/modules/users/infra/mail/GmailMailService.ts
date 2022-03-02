import { MailService, IMessage } from '@neo/mail';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { mailConfig } from '../../../../infra/lib/constants';

export class GmailMailService implements MailService {
  private transporter: Mail;

  constructor() {
    const { user, pass } = mailConfig;
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user,
        pass,
      },
    });
  }

  public async send(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.props.name,
        address: message.to.props.email,
      },
      from: {
        name: message.from.props.name,
        address: message.from.props.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
