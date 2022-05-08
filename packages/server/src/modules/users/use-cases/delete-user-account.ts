import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function DeleteUserAccount(request: Request<{ id: string }>, response: Response): Promise<Response> {
  const { id } = request.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

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
