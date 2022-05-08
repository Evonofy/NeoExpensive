import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';
import { AppNotFound } from '../domain/errors/AppNotFound';

type EditOauthAppProps = {
  name?: string;
  description?: string;
  homepage?: string;
  callback?: string;
};

export async function EditOauthApp(request: Request<{ appId: string }, {}, EditOauthAppProps>, response: Response): Promise<Response> {
  const { appId } = request.params;

  try {
    const appExists = await prisma.oauthApp.findUnique({
      where: {
        clientID: appId,
      },
    });

    if (!appExists) {
      throw new AppNotFound();
    }

    const { ...rest } = request.body;

    const app = await prisma.oauthApp.update({
      where: {
        clientID: appId,
      },

      data: {
        ...appExists,
        ...rest,
      },
    });

    return response.status(201).json(app);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
