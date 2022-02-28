import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function InvalidateRefreshTokenController(request: Request<{}, {}, { id: string }>, response: Response): Promise<Response> {
  const { id } = request.body;

  try {
    await prisma.refreshToken.delete({
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
