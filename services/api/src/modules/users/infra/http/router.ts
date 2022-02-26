import express, { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
// import { verify } from 'jsonwebtoken';
import { prisma } from '../../../../infra/prisma';

import { LoginUserController, RegisterUserController, RefreshUserTokenController, RecoverUserPaswordController, SetUserNewPasswordController } from '../../use-cases';
import { AuthenticateUserGithubController } from '../../use-cases/authenticate-user-github';
import { RecoverUserInformationController } from '../../use-cases/recover-user-information';
import { DisconnectUserAccountsController } from '../../use-cases/disconnect-user-accounts';

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

const auth = async (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: 'Please supply an access token.',
    });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return response.status(401).json({
      error: 'Please supply an access token with a bearer prefix.',
    });
  }

  try {
    const { userId, tokenVersion } = verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      userId: string;
      tokenVersion: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Invalid access token.');
    }

    if (user.tokenVersion !== tokenVersion) {
      throw new Error('Invalid token.');
    }

    request.user = user;
  } catch (error) {
    return response.status(401).json({
      error: (error as Error).message,
    });
  }

  return next();
};

usersRouter.post('/', RegisterUserController);
usersRouter.get('/', auth, RecoverUserInformationController);

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
usersRouter.post('/refresh-token', RefreshUserTokenController);
usersRouter.post('/profile', RecoverUserInformationController);

usersRouter.post('/forgot-password', RecoverUserPaswordController);
usersRouter.post('/set-new-password', SetUserNewPasswordController);

usersRouter.post('/disconnect', auth, DisconnectUserAccountsController);

usersRouter.post('/authenticate/github', AuthenticateUserGithubController);

usersRouter.get('/login/oauth/github', (_, response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`);
});
