import { Request, Response } from 'express';

import { prisma } from '../../../infra/prisma';

type CreateAdminUserProps = {
  roleId?: string;
  permissionId?: string;
  admin_code: string;
};

export async function SetUserToAdmin(request: Request<{}, {}, CreateAdminUserProps>, response: Response): Promise<Response> {
  try {
    const { id } = request.user;
    const { admin_code: adminCode, roleId, permissionId } = request.body;
    const codeMatches = adminCode === process.env.ADMIN_CODE;

    if (!codeMatches) {
      return response.status(401).send();
    }

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that ID.');
    }

    if (roleId) {
      const role = await prisma.role.findUnique({
        where: {
          id: roleId,
        },

        select: {
          id: true,
        },
      });

      if (!role) {
        throw new Error('Could not find a role with that ID.');
      }

      await prisma.user.update({
        where: {
          id,
        },

        data: {
          roles: {
            connect: {
              id: roleId,
            },
          },
        },
      });
    }

    if (permissionId) {
      const permission = await prisma.permission.findUnique({
        where: {
          id: permissionId,
        },

        select: {
          id: true,
        },
      });

      if (!permission) {
        throw new Error('Could not find a permission with that ID.');
      }

      await prisma.user.update({
        where: {
          id,
        },

        data: {
          permissions: {
            connect: {
              id: permissionId,
            },
          },
        },
      });
    }

    return response.status(200).send();
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
}
