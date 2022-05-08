import { Request, Response } from 'express';
import crypto from 'crypto';

import { prisma } from '../../../infra/prisma';

export async function CreatePermissionController(request: Request<{}, {}, { name: string; description: string }>, response: Response): Promise<Response> {
  const { name, description } = request.body;

  try {
    const permissionAlreadyExists = await prisma.permission.findFirst({
      where: {
        name,
      },
    });

    if (permissionAlreadyExists) {
      throw new Error('A permission with this name already exists.');
    }

    const permission = await prisma.permission.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description,
      },
    });

    return response.status(201).json(permission);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
