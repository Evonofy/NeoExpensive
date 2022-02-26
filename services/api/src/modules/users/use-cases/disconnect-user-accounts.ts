import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { prisma } from '../../../infra/prisma';

export async function DisconnectUserAccountsController(request: Request<{}, {}, { refresh_token: string }>, response: Response): Promise<Response> {
  const { refresh_token: refreshToken } = request.body;
  const { id } = request.user;

  try {
    const { id: refreshTokenId } = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as unknown as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with this e-mail.');
    }
    console.log(user.tokenVersion);
    const tokenVersion = user.tokenVersion + 1;

    await prisma.user.update({
      where: {
        id,
      },

      data: {
        tokenVersion,
      },
    });

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
        id: {
          not: refreshTokenId,
        },
      },
    });

    const accessToken = sign({ userId: user.id, tokenVersion }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '5m',
    });

    return response.status(200).json({
      accessToken,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
