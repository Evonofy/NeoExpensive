import { IMessage } from './IMailServiceDTO';

export interface IMailService {
  sendMail: (message: IMessage) => Promise<void>;
}
