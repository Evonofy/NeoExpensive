/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { prisma } from '../../../infra/prisma';

import { verify } from 'jsonwebtoken';

export async function RecoverUserInformationController(request: Request<{}, {}, { access_token: string }>, response: Response): Promise<Response> {
  const { access_token: accessToken } = request.body;

  try {
    const token = verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: token.userId,
      },
    });

    if (!user) {
      throw new Error('Invalid access token.');
    }

    // compare token version against user token version

    return response.status(200).json({
      user,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
