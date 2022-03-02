/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { prisma } from '../../../infra/prisma';
import { generateRefreshToken } from '../lib/generateRefreshToken';

export async function LoginUserController(request: Request<{}, {}, { login: string; password: string; platform: string; language: string }>, response: Response): Promise<Response> {
  const { login, password, language, platform } = request.body;

  // login can be an ID, E-mail or Username

  try {
    let user = await prisma.user.findUnique({
      where: {
        id: login,
      },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email: login,
        },
      });
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          username: login,
        },
      });
    }

    if (!user) {
      throw new Error('Could not find user with that login.');
    }

    const comaparePasswords = await bcrypt.compare(password, user.password!);

    if (!comaparePasswords) {
      throw new Error('Invalid password.');
    }

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
        tokenVersion: user.tokenVersion,
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
