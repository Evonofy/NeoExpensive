import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';

export async function SetAccountLanguageController(request: Request<{}, {}, { language: string }>, response: Response): Promise<Response> {
  try {
    const { language } = request.body;
    const { id } = request.user;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with e-mail.');
    }

    await prisma.user.update({
      where: {
        id,
      },

      data: {
        settings: {
          upsert: {
            create: {
              id: crypto.randomUUID(),
              language,
            },

            update: {
              language,
            },
          },
        },
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
