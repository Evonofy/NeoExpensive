import { CreateContact } from './create-contact';
import { TestContactsRepository } from '../repositories/implementations/TestContactsRepository';

const contactsRepository = new TestContactsRepository();
const createContact = new CreateContact(contactsRepository);

describe('Create Contact', () => {
  it('should create contact', async () => {
    const sut = await createContact.execute({
      name: 'test',
      email: 'test@test.com',
    });

    expect(sut.contact.props.email).toBe('test@test.com');
  });

  it('should not create contact with same e-mail', async () => {
    try {
      await createContact.execute({
        name: 'test',
        email: 'test@test.com',
      });
    } catch (err) {
      const { message } = err as Error;
      expect(message).toBe('A contact with this e-mail already exists.');
    }
  });
});
