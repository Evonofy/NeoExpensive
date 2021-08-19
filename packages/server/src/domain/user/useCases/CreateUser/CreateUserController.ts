import { Request, Response } from 'express';

import { CreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const caseRequest: CreateUserRequestDTO = request.body;

    const caseResponse = await this.createUserUseCase.execute(caseRequest);

    return response.json({ ...caseResponse });
  }
}
