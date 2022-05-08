import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListUserByUsername(request: Request<{}, {}, { username: string }>, response: Response): Promise<Response> {
  const { username } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return response.status(400).json({
      error: 'Could not find a user with that username',
    });
  }

  return response.status(200).json(user);
}
