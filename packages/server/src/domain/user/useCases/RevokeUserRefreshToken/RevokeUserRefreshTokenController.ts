import { Request, Response } from 'express';

import { Controller } from '@infra/http/interface/Controller';
import { clientError, ok } from '@infra/http/interface/HttpResponse';

import {
  RevokeUserRefreshTokenRequestDTO,
  RevokeUserRefreshTokenResponseDTO
} from './RevokeUserRefreshTokenDTO';
import { RevokeUserRefreshTokenUseCase } from './RevokeUserRefreshTokenUseCase';

export class RevokeRefreshUserTokenController implements Controller {
  constructor(
    private revokeRefreshUserTokenUseCase: RevokeUserRefreshTokenUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.query as RevokeUserRefreshTokenRequestDTO;

      const caseReponse = await this.revokeRefreshUserTokenUseCase.execute(
        data
      );

      const { body, statusCode } = ok<RevokeUserRefreshTokenResponseDTO>(
        caseReponse
      );

      return response.status(statusCode).json(body);
    } catch (error) {
      const { body, statusCode } = clientError(error);

      return response.status(statusCode).json(body);
    }
  }
}
