import express from 'express';

import { usersRouter, authRouter } from '../../modules/users/infra/http/router';
import { rolesRouter } from '../../modules/roles/infra/http/router';
import { permissionsRouter } from '../../modules/permissions/infra/http/router';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/roles', rolesRouter);
router.use('/permissions', permissionsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

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

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.redirect(`${process.env.CLIENT_URL}?code=${code}`);
});
