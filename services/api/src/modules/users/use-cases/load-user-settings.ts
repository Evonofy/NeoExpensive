import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function LoadUserSettings(request: Request, response: Response): Promise<Response> {
  const { id } = request.user;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      settings: true,
    },
  });

  return response.status(200).json(user?.settings);
}
