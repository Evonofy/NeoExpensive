import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';

type CreateOauthAppProps = {
  name: string;
  description: string;

  homepage: string;
  callback: string;
};

export async function CreateOauthApp(request: Request<{}, {}, CreateOauthAppProps>, response: Response): Promise<Response> {
  const { id: userId } = request.user;
  const { name, description, homepage, callback } = request.body;

  try {
    // generate unique app ID
    const clientID = crypto.randomBytes(8).toString('hex');
    const clientSecret = crypto.randomBytes(14).toString('hex');

    const app = await prisma.oauthApp.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description,
        homepage,
        callback,
        clientID,

        userId,

        clientSecrets: {
          create: {
            id: crypto.randomUUID(),
            value: clientSecret,
          },
        },
      },
    });

    return response.status(201).json(app);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
