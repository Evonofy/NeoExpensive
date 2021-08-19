import { Request, Response } from 'express';

import { createUserController } from './useCases/CreateUser';

export const user = {
  createUser: async (request: Request, response: Response) => {
    return createUserController.handle(request, response);
  }
};
