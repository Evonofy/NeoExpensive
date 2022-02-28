/* eslint-disable new-cap */
import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListSpecificUser(request: Request<{ id: string }>, response: Response): Promise<Response> {
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

    return response.status(200).json({ ...user, password: 10 });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
