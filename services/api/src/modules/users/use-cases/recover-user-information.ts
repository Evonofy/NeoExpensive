/* eslint-disable new-cap */
import { Request, Response } from 'express';
import { prisma } from '../../../infra/prisma';

export async function RecoverUserInformationController(request: Request, response: Response): Promise<Response> {
  try {
    const { id } = request.user;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Invalid access token.');
    }

    return response.status(200).json({
      user,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
