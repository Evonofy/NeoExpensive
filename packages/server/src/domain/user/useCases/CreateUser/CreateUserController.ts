import { Request, Response } from 'express';

import { Controller } from '@infra/http/interface/Controller';
import { ok, clientError } from '@infra/http/interface/HttpResponse';

import { CreateUserRequestDTO, CreateUserResponseDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController implements Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data: CreateUserRequestDTO = request.body;

      const caseReponse = await this.createUserUseCase.execute(data);

      response.header('Authorization', caseReponse.token.payload);

      const { body, statusCode } = ok<CreateUserResponseDTO>(caseReponse);

      return response.status(statusCode).json(body);
    } catch (error) {
      const { body, statusCode } = clientError(error);

      return response.status(statusCode).json(body);
    }
  }
}
