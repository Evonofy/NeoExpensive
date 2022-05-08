import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function DeleteOauthApp(request: Request<{ appId: string }>, response: Response): Promise<Response> {
  const { appId } = request.params;

  try {
    await prisma.secret.deleteMany({
      where: {
        oauthAppId: appId,
      },
    });

    await prisma.oauthApp.delete({
      where: {
        id: appId,
      },
    });

    return response.status(201).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
