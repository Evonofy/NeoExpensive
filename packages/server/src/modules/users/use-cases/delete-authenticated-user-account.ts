import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function DeleteAuthenticatedUserAccount(request: Request<{ id: string }>, response: Response): Promise<Response> {
  const { id } = request.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

    await prisma.secret.deleteMany({
      where: {
        OauthApp: {
          userId: id,
        },
      },
    });

    await prisma.oauthApp.deleteMany({
      where: {
        userId: id,
      },
    });

    await prisma.role.deleteMany({
      where: {
        user: {
          every: {
            id,
          },
        },
      },
    });

    await prisma.permission.deleteMany({
      where: {
        user: {
          every: {
            id,
          },
        },
      },
    });

    await prisma.user.update({
      data: {
        refreshToken: {
          deleteMany: {
            userId: id,
          },
        },

        settings: {
          delete: true,
        },
      },

      where: {
        id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
