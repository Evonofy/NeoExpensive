/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { SendMailToContact, CreateContact } from '@mail';

import { prisma } from '../../../infra/prisma';
import { generateRefreshToken } from '../lib/generateRefreshToken';

import { ContactsPrismaRepository } from '../infra/prisma/contacts-prisma-repository';
import { MailtrapMailService } from '../infra/mail/MailtrapMailService';

import { mailConfig } from '../../../infra/lib/constants';
import { GmailMailService } from '../infra/mail/GmailMailService';

export async function MagicLinkAuthentication(request: Request<{}, {}, { login: string }>, response: Response): Promise<Response> {
  const { login } = request.body;

  // login can be an ID, E-mail or Username
  const contactsRepository = new ContactsPrismaRepository();
  const mailService = mailConfig.driver === 'gmail' ? new GmailMailService() : new MailtrapMailService();

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: login,
      },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email: login,
        },
      });
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          username: login,
        },
      });
    }

    if (!user) {
      throw new Error('Could not find user with that login.');
    }

    // send email
    const { contact: userContact } = await new CreateContact(contactsRepository).execute({
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

    const accessToken = sign(
      {
        userId: user.id,
        tokenVersion: user.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const { refreshToken: RefreshToken } = await new generateRefreshToken().execute(user.id);

    const refreshToken = sign(
      {
        ...RefreshToken,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '3d',
      }
    );

    await new SendMailToContact(contactsRepository, mailService).execute({
      contact: userContact,
      senderContact,
      mail: {
        subject: 'Magic Link Authentication',
        body: `
          <a href="${process.env.CLIENT_URL}/login/magic/authorize?access=${accessToken}&refresh=${refreshToken}">
            go to the website
          </a>
        `,
      },
    });

    return response.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
