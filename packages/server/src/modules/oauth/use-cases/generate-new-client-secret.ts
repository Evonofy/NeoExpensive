import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';

export async function GenerateNewClientSecret(request: Request<{ appId: string }>, response: Response): Promise<Response> {
  const { appId } = request.params;

  try {
    // generate unique app ID
    const clientSecret = crypto.randomBytes(14).toString('hex');

    const app = await prisma.oauthApp.update({
      where: {
        id: appId,
      },

      data: {
        clientSecrets: {
          create: {
            id: crypto.randomUUID(),
            value: clientSecret,
          },
        },
      },

      include: {
        clientSecrets: true,
      },
    });

    return response.status(201).json(app.clientSecrets.find(({ value }) => value === clientSecret));
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
