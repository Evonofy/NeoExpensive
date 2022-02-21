import { Contact } from '../../domain/entities/contact';

type IAddress = Contact;

export type IMessage = {
  to: IAddress;
  from: IAddress;
  subject: string;
  body: string;
};

export interface MailService {
  send: (data: IMessage) => Promise<void>;
}
