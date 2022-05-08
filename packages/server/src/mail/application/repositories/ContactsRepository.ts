import { Contact } from '../../domain/entities/contact';

export interface ContactsRepository {
  findByEmail: (email: string) => Promise<Contact | null>;
  save: (data: { contact: Contact }) => Promise<void>;
}
