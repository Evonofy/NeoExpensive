/* eslint-disable new-cap */
import { user as userController } from '@neo/users';
import { Request, Response } from 'express';

import { usersPrismaRepository } from '../infra/prisma/users-prisma-repository';

export async function LoginUserController(request: Request<{}, {}, { email: string; password: string }>, response: Response): Promise<Response> {
  const { email, password } = request.body;

  try {
    const usersRepository = new usersPrismaRepository();
    const { user } = await new userController.login(usersRepository).execute({
      email,
      password,
    });

    return response.status(200).json({
      user,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
