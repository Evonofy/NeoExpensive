/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { user as userController } from '@neo/users';
import { CreateContact, SendMailToContact } from '@neo/mail';

import { usersPrismaRepository } from '../infra/prisma/users-prisma-repository';
import { ContactsPrismaRepository } from '../infra/prisma/contacts-prisma-repository';
import { MailtrapMailService } from '../infra/mail/MailtrapMailService';
import { sign } from 'jsonwebtoken';

export async function RecoverUserPaswordController(request: Request<{}, {}, { email: string }>, response: Response): Promise<Response> {
  const usersRepository = new usersPrismaRepository();
  const contactsRepository = new ContactsPrismaRepository();
  const mailService = new MailtrapMailService();

  try {
    const { email } = request.body;

    const { user } = await new userController.findByEmail(usersRepository).execute({
      email,
    });

    const { contact } = await new CreateContact(contactsRepository).execute({
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

    new SendMailToContact(contactsRepository, mailService).execute({
      contact,
      senderContact,
      mail: {
        body: `click this button and create a new password <a href="${process.env.CLIENT_URL}/recover-password">recover my password</a>`,
        subject: 'NeoExpensive Password Recovery',
      },
    });

    const accessToken = sign(
      {
        userId: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    return response.status(200).json({
      accessToken,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
