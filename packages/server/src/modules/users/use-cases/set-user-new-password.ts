/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { CreateContact, SendMailToContact } from '@mail';

import { prisma } from '../../../infra/prisma';
import { ContactsPrismaRepository } from '../infra/prisma/contacts-prisma-repository';
import { MailtrapMailService } from '../infra/mail/MailtrapMailService';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import { GmailMailService } from '../infra/mail/GmailMailService';
import { mailConfig } from '../../../infra/lib/constants';

export async function SetUserNewPasswordController(request: Request<{}, {}, { accessToken: string; password: string }>, response: Response): Promise<Response> {
  const contactsRepository = new ContactsPrismaRepository();
  const mailService = mailConfig.driver === 'gmail' ? new GmailMailService() : new MailtrapMailService();

  const { accessToken, password } = request.body;
  let token: {
    userId: string;
  } | null = null;

  try {
    token = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: token.userId,
      },
    });

    if (!user) {
      throw new Error('Could not find user with this e-mail.');
    }

    await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        password: await hash(password, 10),
      },
    });

    const { contact } = await new CreateContact(contactsRepository).execute({
      name: user.name,
      email: user.email,
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
        body: `your password was changed, if it was not you, cry and panic`,
        subject: 'NeoExpertise Password Recovery',
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
