import { Router } from 'express';

export const router = Router();

router.get('/user', (_, response) => {
  return response.json('hello');
});
