import { Contact } from '../../../domain/entities/contact';
import { ContactsRepository } from '../ContactsRepository';

export class TestContactsRepository implements ContactsRepository {
  private contacts: Contact[] = [];

  public async findByEmail(email: string): Promise<Contact | null> {
    const contact = this.contacts.find((contact) => contact.props.email === email);

    if (!contact) {
      return null;
    }

    return contact;
  }

  public async save({ contact }: { contact: Contact }): Promise<void> {
    this.contacts.push(contact);
  }
}
