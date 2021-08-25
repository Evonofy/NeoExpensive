import { Request, Response } from 'express';

import { Controller } from '@infra/http/interface/Controller';
import { clientError, ok } from '@infra/http/interface/HttpResponse';

import {
  RefreshTokenUserRequestDTO,
  RefreshTokenUserResponseDTO
} from './RefreshUserTokenDTO';
import { RefreshUserTokenUseCase } from './RefreshUserTokenUseCase';

export class RefreshUserTokenController implements Controller {
  constructor(private refreshUserTokenUseCase: RefreshUserTokenUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data: RefreshTokenUserRequestDTO = request.body;

      const caseReponse = await this.refreshUserTokenUseCase.execute(data);

      response.header('Authorization', caseReponse.accessToken);

      const { body, statusCode } = ok<RefreshTokenUserResponseDTO>(caseReponse);

      return response.status(statusCode).json(body);
    } catch (error) {
      const { body, statusCode } = clientError(error);

      return response.status(statusCode).json(body);
    }
  }
}
