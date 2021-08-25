import { Request, Response } from 'express';

import { Controller } from '@infra/http/interface/Controller';
import { ok, clientError } from '@infra/http/interface/HttpResponse';

import { AuthUserRequestDTO, AuthUserResponseDTO } from './AuthUserDTO';
import { AuthUserUseCase } from './AuthUserUseCase';

export class AuthUserController implements Controller {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      let data: AuthUserRequestDTO = request.body;

      const token = request.headers['authorization'];

      data = { ...data, token };
      const caseResponse = await this.authUserUseCase.execute(data);

      const { body, statusCode } = ok<AuthUserResponseDTO>(caseResponse);

      return response.status(statusCode).json(body);
    } catch (error) {
      const { body, statusCode } = clientError(error);

      return response.status(statusCode).json(body);
    }
  }
}
