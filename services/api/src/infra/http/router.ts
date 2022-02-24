import express from 'express';

import { usersRouter } from '../../modules/users/infra/http/router';

// eslint-disable-next-line new-cap
export const router = express.Router();

router.post('/workers', () => {
  console.log('Creating a new worker');
  process.exit();
});

router.use('/users', usersRouter);

router.get('/', (_, response) => {
  return response.status(200).json({
    status: 200,
    api: 'alive',
  });
});

router.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  return response.redirect(`${process.env.CLIENT_URL}?code=${code}`);
});
