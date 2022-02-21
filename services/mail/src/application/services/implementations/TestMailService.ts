import { MailService, IMessage } from '../MailService';

export class TestMailService implements MailService {
  public async send({ to, from, subject, body }: IMessage): Promise<void> {
    console.log({
      to,
      from,
      subject,
      body,
    });
  }
}
