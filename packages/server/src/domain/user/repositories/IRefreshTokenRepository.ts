import {
  RefreshTokenRequest,
  RefreshTokenResponse
} from './IRefreshTokenRepositoryDTO';

export interface IRefreshTokenRepository {
  create: (refreshToken: RefreshTokenRequest) => Promise<RefreshTokenResponse>;
  find: (id: string) => Promise<RefreshTokenResponse>;
  clean: (userId: string) => Promise<void>;
}
