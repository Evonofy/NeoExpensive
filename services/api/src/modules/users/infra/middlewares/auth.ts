import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { prisma } from '../../../../infra/prisma';

export const auth = async (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: 'Please supply an access token.',
    });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response.status(401).json({
      error: 'Please supply an access token with a bearer prefix.',
    });
  }

  try {
    const { userId, tokenVersion } = verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      userId: string;
      tokenVersion: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Invalid access token.');
    }

    if (user.tokenVersion !== tokenVersion) {
      throw new Error('Invalid token.');
    }

    request.user = user;
  } catch (error) {
    return response.status(401).json({
      error: (error as Error).message,
    });
  }

  return next();
};
