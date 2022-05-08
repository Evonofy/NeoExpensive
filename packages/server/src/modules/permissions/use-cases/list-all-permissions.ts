import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListAllPermissionsController(_: Request, response: Response): Promise<Response> {
  try {
    const permissions = await prisma.permission.findMany();

    return response.status(200).json(permissions);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
