import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListAllRefreshTokensController(request: Request, response: Response): Promise<Response> {
  const { id } = request.user;

  try {
    const refreshToken = await prisma.refreshToken.findMany({
      where: {
        userId: id,
      },
    });

    return response.status(200).json({
      refreshToken,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
