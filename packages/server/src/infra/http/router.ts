import express, { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { usersRouter, authRouter } from '../../modules/users/infra/http/router';
import { rolesRouter } from '../../modules/roles/infra/http/router';
import { permissionsRouter } from '../../modules/permissions/infra/http/router';
import { OAuthRouter } from '../../modules/oauth/infra/http/router';
import { prisma } from '../prisma';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/roles', rolesRouter);
router.use('/permissions', permissionsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/oauth', OAuthRouter);

router.post('/login/oauth/access_token', (request: Request<{}, {}, {}, { client_id: string; client_secret: string; code: string }>, response) => {
  const { client_id: clientId, client_secret: clientSecret, code } = request.query;

  return response.status(200).json({
    access_token: sign(
      {
        clientId,
        userId: code,
      },
      clientSecret
    ),
  });
});

router.get('/user', async (request: Request<{}, {}, {}, { client_secret: string }>, response) => {
  const { authorization } = request.headers;
  const { client_secret: secret } = request.query;

  if (!authorization) {
    return response.status(401).json({
      error: 'supply an authorization header.',
    });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response.status(401).json({
      error: 'Please supply an access token with a bearer prefix.',
    });
  }

  try {
    const { userId } = verify(token, secret) as {
      userId: string;
      clientId: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Could not find user with that ID.');
    }

    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
});

router.get('/', (_, response) => {
  return response.status(200).json({
    status: 200,
    api: 'alive',
  });
});

router.get('/status', (_, response) => {
  return response.status(200).json({
    status: 200,
    api: true,
    users: true,
    core: true,
    mail: true,
  });
});

router.get('/signin/callback/github', (request: Request<{}, {}, {}, { code: string }>, response) => {
  const { code } = request.query;

  return response.redirect(`${process.env.CLIENT_URL}?code=${code}&provider=github`);
});

router.get('/signin/callback/neo', (request: Request<{}, {}, {}, { code: string }>, response) => {
  const { code } = request.query;

  return response.redirect(`${process.env.CLIENT_URL}?code=${code}&provider=neo`);
});
