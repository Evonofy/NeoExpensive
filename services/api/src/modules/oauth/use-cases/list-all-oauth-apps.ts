import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListAllOauthApps(request: Request, response: Response): Promise<Response> {
  const { id } = request.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },

      include: {
        apps: {
          include: {
            clientSecrets: true,
          },
        },
      },
    });

    return response.status(200).json(user?.apps);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
