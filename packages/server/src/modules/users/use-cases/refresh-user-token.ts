/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { verify, sign } from 'jsonwebtoken';
// import { RefreshToken } from '@prisma/client';

import { generateRefreshToken as GenerateRefreshToken } from '../lib/generateRefreshToken';
import dayjs from 'dayjs';
import { prisma } from '../../../infra/prisma';
import { RefreshToken } from '@prisma/client';

export async function RefreshUserTokenController(request: Request<{}, {}, { refresh_token: string }>, response: Response): Promise<Response> {
  const { refresh_token: refreshToken } = request.body;
  const generateRefreshToken = new GenerateRefreshToken();

  try {
    const { expiresIn, userId, id } = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as unknown as {
      id: string;
      userId: string;
      expiresIn: number;
    };

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(expiresIn));

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Could not find a user from that token.');
    }

    const accessToken = sign(
      {
        userId: user.id,
        tokenVersion: user.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    let newRefreshToken: RefreshToken | null = null;

    if (refreshTokenExpired) {
      await prisma.refreshToken.delete({
        where: {
          id,
        },
      });

      const { refreshToken } = await generateRefreshToken.execute(user.id);

      newRefreshToken = refreshToken;

      return response.status(200).json({
        accessToken,
        refreshToken: sign({ ...newRefreshToken }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '3d',
        }),
      });
    }

    return response.status(200).json({
      accessToken,
    });
    // const { refreshToken: token } = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as unknown as { refreshToken: RefreshToken };

    // const refreshTokenExpired = dayjs().isAfter(dayjs.unix(token.expiresIn));

    // let refreshToken: RefreshToken | null = null;
    // if (refreshTokenExpired) {
    //   const { refreshToken: newRefreshToken } = await new generateRefreshToken().execute(token.userId);
    //   refreshToken = newRefreshToken;
    // }

    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: token.userId,
    //   },
    //   select: {
    //     tokenVersion: true,
    //   },
    // });

    // if (!user) {
    //   throw new Error('Invalid refresh token.');
    // }

    // const accessToken = sign(
    //   {
    //     userId: token.userId,
    //     tokenVersion: user?.tokenVersion,
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   {
    //     expiresIn: '5m',
    //   }
    // );

    // const { refreshToken: newRefreshToken } = await new generateRefreshToken().execute(token.userId);

    // refreshToken = newRefreshToken;

    // return response.status(200).json({
    //   accessToken,
    //   refreshToken: sign(
    //     {
    //       ...refreshToken,
    //     },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     {
    //       expiresIn: '3d',
    //     }
    //   ),
    // });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
