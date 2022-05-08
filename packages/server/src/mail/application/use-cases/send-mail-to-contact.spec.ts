import { CreateContact } from './create-contact';
import { SendMailToContact } from './send-mail-to-contact';
import { TestContactsRepository } from '../repositories/implementations/TestContactsRepository';
import { TestMailService } from '../services/implementations/TestMailService';

const contactsRepository = new TestContactsRepository();
const mailService = new TestMailService();

const sendMailToContact = new SendMailToContact(contactsRepository, mailService);
const createContact = new CreateContact(contactsRepository);

async function createContactFactory() {
  const { contact } = await createContact.execute({
    name: 'test',
    email: 'test@test.com',
  });

  const { contact: senderContact } = await createContact.execute({
    name: 'sender',
    email: 'test@sender.com',
  });

  return {
    contact,
    senderContact,
  };
}

describe('Send mail to contact', () => {
  it('should send an e-mail to given contact', async () => {
    const { contact, senderContact } = await createContactFactory();

    const sut = await sendMailToContact.execute({
      contact,
      senderContact,
      mail: {
        subject: 'test mail subject',
        body: 'test mail body',
      },
    });

    expect(sut.mail.subject).toBe('test mail subject');
    expect(sut.mail.body).toBe('test mail body');
  });
});
