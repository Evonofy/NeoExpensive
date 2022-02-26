/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { RefreshToken } from '@prisma/client';

import { generateRefreshToken } from '../lib/generateRefreshToken';
import dayjs from 'dayjs';
import { prisma } from '../../../infra/prisma';

export async function RefreshUserTokenController(request: Request<{}, {}, { refresh_token: string }>, response: Response): Promise<Response> {
  const { refresh_token: refreshToken } = request.body;

  let token: RefreshToken | null = null;

  try {
    token = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as unknown as RefreshToken;
  } catch (error) {
    throw new Error((error as Error).message);
  }

  const refreshTokenExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));

  try {
    let refreshToken: { refreshToken: RefreshToken | null } = {
      refreshToken: null,
    };
    if (refreshTokenExpired) {
      refreshToken = await new generateRefreshToken().execute(token.userId);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: token.userId,
      },
      select: {
        tokenVersion: true,
      },
    });

    if (!user) {
      throw new Error('Invalid refresh token.');
    }

    const accessToken = sign(
      {
        userId: token.userId,
        tokenVersion: user?.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    refreshToken = await new generateRefreshToken().execute(token.userId);

    return response.status(200).json({
      accessToken,
      refreshToken: sign(
        {
          ...refreshToken,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '3d',
        }
      ),
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
