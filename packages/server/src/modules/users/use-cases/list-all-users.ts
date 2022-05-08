import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListAllUsers(_: Request, response: Response): Promise<Response> {
  try {
    const users = await prisma.user.findMany();

    return response.status(200).json(users);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
