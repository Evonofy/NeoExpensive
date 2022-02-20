import { user as userController } from '@neo/users';
import { Request, Response } from 'express';

export async function LoginUserController(request: Request<{}, {}, { email: string; password: string }>, response: Response): Promise<Response> {
  const { email, password } = request.body;

  try {
    const { user } = await userController.login({
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
