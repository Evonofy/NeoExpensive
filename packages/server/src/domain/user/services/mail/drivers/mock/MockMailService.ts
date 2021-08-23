import { IMailService, IMessage } from '@user/services/mail';

export class MockMailService implements IMailService {
  async sendMail(message: IMessage): Promise<void> {
    console.log(message);
  }
}
