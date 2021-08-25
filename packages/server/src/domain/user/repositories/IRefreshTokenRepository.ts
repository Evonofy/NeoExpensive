import {
  RefreshTokenRequest,
  RefreshTokenResponse
} from './IRefreshTokenRepositoryDTO';

export interface IRefreshTokenRepository {
  find: (id: RefreshTokenRequest) => Promise<RefreshTokenResponse>;
  clean: (userId: string) => Promise<void>;
}
