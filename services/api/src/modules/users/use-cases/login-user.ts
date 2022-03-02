/* eslint-disable new-cap */
import { user as userController } from '@neo/users';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';
import { generateRefreshToken } from '../lib/generateRefreshToken';
import { usersPrismaRepository } from '../infra/prisma/users-prisma-repository';

export async function LoginUserController(request: Request<{}, {}, { email: string; password: string; platform: string; language: string }>, response: Response): Promise<Response> {
  const { email, password, language, platform } = request.body;

  try {
    const usersRepository = new usersPrismaRepository();
    const { user } = await new userController.login(usersRepository).execute({
      email,
      password,
    });

    let settings = await prisma.settings.findFirst({
      where: {
        User: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: crypto.randomUUID(),
          language,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    await prisma.settings.update({
      where: {
        id: settings.id,
      },

      data: {
        language,
      },
    });

    const accessToken = sign(
      {
        userId: user.id,
        tokenVersion: user.props.tokenVersion,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const { refreshToken } = await new generateRefreshToken().execute(user.id, {
      platform,
    });

    return response.status(200).json({
      user,
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
