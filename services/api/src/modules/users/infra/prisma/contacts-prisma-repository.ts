import { ContactsRepository, Contact } from '@neo/mail';

import { prisma } from '../../../../infra/prisma';

export class ContactsPrismaRepository implements ContactsRepository {
  public async findByEmail(email: string): Promise<Contact | null> {
    const contact = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!contact) {
      return null;
    }

    const { id, name } = contact;

    return Contact.create(
      {
        name,
        email,
      },
      id
    );
  }

  public async save({ contact }: { contact: Contact }): Promise<void> {
    await prisma.user.create({
      data: {
        id: contact.id,
        username: `contact: ${contact.props.name}-${contact.id}`,
        avatarUrl: `https://avatars.dicebear.com/api/identicon/${contact.id}.svg`,
        name: contact.props.name,
        email: contact.props.email,
        password: '',
        createdAt: contact.props.createdAt,
        updatedAt: contact.props.updatedAt,
      },
    });
  }
}
