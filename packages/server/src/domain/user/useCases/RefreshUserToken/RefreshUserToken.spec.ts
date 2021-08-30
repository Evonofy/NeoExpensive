import { RefreshUserTokenUseCase } from './RefreshUserTokenUseCase';

import { MockRefreshTokenRepository } from '@user/repositories/drivers/mock';
import { AccessTokenProvider, RefreshTokenProvider } from '@user/providers';

import { User } from '@user/entities';

const refreshTokenRepository = new MockRefreshTokenRepository();
const accessTokenProvider = new AccessTokenProvider();
const refreshTokenProvider = new RefreshTokenProvider(refreshTokenRepository);

const refreshUserToken = new RefreshUserTokenUseCase(
  refreshTokenRepository,
  accessTokenProvider,
  refreshTokenProvider
);

describe('Refresh token', () => {
  it('should give a new access token', async () => {
    const user = new User({
      name: 'test',
      email: 'test@test.com',
      password: '123'
    });

    const { refreshToken } = await refreshTokenProvider.execute(user.id);
    const { message, accessToken } = await refreshUserToken.execute({
      refresh_token: refreshToken.id
    });

    expect(message).toBe('here is your token.');
    expect(accessToken).toBeTruthy();
  });
});
