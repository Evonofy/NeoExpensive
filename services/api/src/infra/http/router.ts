import express from 'express';

import { usersRouter } from '../../modules/users/infra/http/router';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.use('/users', usersRouter);
router.get('/', (_, response) => {
  return response.status(200).json({
    status: 200,
    api: 'alive',
  });
});
