import { Request, Response } from 'express';

import { Controller } from '@infra/http/interface/Controller';
import { ok, clientError } from '@infra/http/interface/HttpResponse';

import { ActivateUserResponseDTO } from './ActivateUserDTO';
import { ActivateUserUseCase } from './ActivateUserUseCase';

export class ActivateUserController implements Controller {
  constructor(private activateUserUseCase: ActivateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const header = request.headers['authorization'];
      const queryToken = request.query.token as string;

      const caseResponse = await this.activateUserUseCase.execute({
        queryToken,
        header
      });

      response.header('Authorization', caseResponse.accessToken);

      const { body, statusCode } = ok<ActivateUserResponseDTO>(caseResponse);

      return response.status(statusCode).json(body);
    } catch (error) {
      const { body, statusCode } = clientError(error);

      return response.status(statusCode).json(body);
    }
  }
}
