import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

export async function ListAllRolesController(_: Request, response: Response): Promise<Response> {
  try {
    const roles = await prisma.role.findMany();

    return response.status(200).json(roles);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
