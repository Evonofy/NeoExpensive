import { Contact } from '../../domain/entities/contact';

import { ContactsRepository } from '../repositories/ContactsRepository';
import { MailService } from '../services/MailService';

type SendMailToContactProps = {
  contact: Contact;
  senderContact: Contact;
  mail: {
    subject: string;
    body: string;
  };
};

export class SendMailToContact {
  constructor(private readonly contactsRepository: ContactsRepository, private readonly mailService: MailService) {}

  public async execute({ contact, senderContact, mail }: SendMailToContactProps) {
    const contactExists = await this.contactsRepository.findByEmail(contact.props.email);
    const senderContactExists = await this.contactsRepository.findByEmail(senderContact.props.email);

    if (!contactExists || !senderContactExists) {
      throw new Error('Could not find a contact with this email.');
    }

    await this.mailService.send({
      to: contactExists,
      from: senderContact,
      ...mail,
    });

    return {
      mail,
    };
  }
}
