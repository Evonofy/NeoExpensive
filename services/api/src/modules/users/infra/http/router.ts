import express from 'express';

import { prisma } from '../../../../infra/prisma';
import { auth } from '../middlewares/auth';

import { LoginUserController, RegisterUserController, RecoverUserPaswordController, SetUserNewPasswordController, RefreshUserTokenController } from '../../use-cases';
import { AuthenticateUserGithubController } from '../../use-cases/authenticate-user-github';
import { RecoverUserInformationController } from '../../use-cases/recover-user-information';
import { DisconnectUserAccountsController } from '../../use-cases/disconnect-user-accounts';
import { SetAccountThemeController } from '../../use-cases/set-account-theme';
import { ListAllRefreshTokensController } from '../../use-cases/list-all-refresh-tokens';
import { InvalidateRefreshTokenController } from '../../use-cases/invalidate-refresh-token';

// eslint-disable-next-line new-cap
export const authRouter = express.Router();
authRouter.post('/refresh-token', RefreshUserTokenController);
authRouter.get('/refresh-token', auth, ListAllRefreshTokensController);
authRouter.delete('/refresh-token', auth, InvalidateRefreshTokenController);

// eslint-disable-next-line new-cap
export const usersRouter = express.Router();

usersRouter.post('/', RegisterUserController);
usersRouter.get('/', auth, async (_, response) => {
  const users = await prisma.user.findMany();

  return response.status(200).json({
    users,
  });
});

usersRouter.get('/:id', auth, RecoverUserInformationController);

usersRouter.post('/login', LoginUserController);
usersRouter.post('/register', RegisterUserController);
usersRouter.get('/profile', auth, async (request, response) => {
  const { id } = request.user;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error('Could not find a user with that e-mail.');
    }

    return response.status(200).json({
      user,
    });
  } catch (error) {
    return response.status(400).json({
      error: (error as Error).message,
    });
  }
});

usersRouter.post('/profile/settings/theme', SetAccountThemeController);

usersRouter.post('/forgot-password', RecoverUserPaswordController);
usersRouter.post('/set-new-password', SetUserNewPasswordController);

usersRouter.post('/disconnect', auth, DisconnectUserAccountsController);

usersRouter.post('/authenticate/github', AuthenticateUserGithubController);

usersRouter.get('/login/oauth/github', (_, response) => {
  return response.redirect(`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`);
});
