/* eslint-disable new-cap */
import { user as userController } from '@neo/users';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { generateRefreshToken } from '../lib/generateRefreshToken';
import { usersPrismaRepository } from '../infra/prisma/users-prisma-repository';

export async function LoginUserController(request: Request<{}, {}, { email: string; password: string }>, response: Response): Promise<Response> {
  const { email, password } = request.body;

  try {
    const usersRepository = new usersPrismaRepository();
    const { user } = await new userController.login(usersRepository).execute({
      email,
      password,
    });

    const accessToken = sign(
      {
        userId: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '5m',
      }
    );

    const { refreshToken } = await new generateRefreshToken().execute(user.id);

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
    console.log(error);
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
