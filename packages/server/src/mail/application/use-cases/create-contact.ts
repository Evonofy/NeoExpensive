import { ContactsRepository } from '../repositories/ContactsRepository';
import { Contact } from '../../domain/entities/contact';

type CreateContactProps = {
  name: string;
  email: string;
};

export class CreateContact {
  constructor(private readonly contactsRepository: ContactsRepository) {}

  public async execute({ name, email }: CreateContactProps) {
    const contactAlreadyExists = await this.contactsRepository.findByEmail(email);

    const contact = Contact.create({
      name,
      email,
    });

    if (!contactAlreadyExists) {
      await this.contactsRepository.save({
        contact,
      });
    }

    return {
      contact,
    };
  }
}
