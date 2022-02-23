import { MailService, IMessage } from '../MailService';

import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export class MailtrapMailService implements MailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b46da5240e73cc',
        pass: '84b46267394ac9',
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
