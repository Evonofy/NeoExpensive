import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function GetAppByClientId(request: Request<{ client_id: string }>, response: Response): Promise<Response> {
  const { client_id: clientId } = request.params;

  try {
    const app = await prisma.oauthApp.findUnique({
      where: {
        clientID: clientId,
      },
    });

    return response.status(201).json(app);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
