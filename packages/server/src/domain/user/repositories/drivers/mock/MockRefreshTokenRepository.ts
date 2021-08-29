import { IRefreshTokenRepository } from '../../';
import {
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../../IRefreshTokenRepositoryDTO';

export class MockRefreshTokenRepository implements IRefreshTokenRepository {
  private tokens: RefreshTokenRequest[] = [];

  async create(
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    this.tokens.push(refreshToken);

    return refreshToken;
  }

  async find(id: string): Promise<RefreshTokenResponse> {
    const token = this.tokens.find(token => token.id === id);

    return token;
  }

  async clean(userId: string): Promise<void> {
    const filteredTokens = this.tokens.filter(token => token.userId === userId);

    this.tokens = filteredTokens;
  }
}
