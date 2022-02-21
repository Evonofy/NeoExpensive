/* eslint-disable new-cap */
import { user as userController } from '@neo/users';
import { SendMailToContact, CreateContact } from '@neo/mail';
import { Request, Response } from 'express';

import { usersPrismaRepository } from '../infra/prisma/users-prisma-repository';
import { ContactsPrismaRepository } from '../infra/prisma/contacts-prisma-repository';
import { MailtrapMailService } from '../infra/mail/MailtrapMailService';

export async function RegisterUserController(request: Request<{}, {}, { name: string; email: string; password: string }>, response: Response) {
  const { name, email, password } = request.body;

  const usersRepository = new usersPrismaRepository();
  const contactsRepository = new ContactsPrismaRepository();
  const mailService = new MailtrapMailService();
  try {
    const { user } = await new userController.register(usersRepository).execute({
      name,
      email,
      password,
    });

    const { contact: userContact } = await new CreateContact(contactsRepository).execute({
      name: user.props.name,
      email: user.props.email,
    });

    let senderContact = await contactsRepository.findByEmail(process.env.MAIL_SENDER_EMAIL);

    if (!senderContact) {
      const { contact } = await new CreateContact(contactsRepository).execute({
        name: 'Email sender account',
        email: process.env.MAIL_SENDER_EMAIL,
      });

      senderContact = contact;
    }

    await new SendMailToContact(contactsRepository, mailService).execute({
      contact: userContact,
      senderContact,
      mail: {
        body: 'test',
        subject: 'dadawda',
      },
    });

    return response.status(200).json({
      user,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
