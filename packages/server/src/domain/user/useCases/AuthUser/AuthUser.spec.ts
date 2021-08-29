import {
  MockUsersRepository,
  MockRefreshTokenRepository
} from '@user/repositories/drivers/mock';
import { RefreshTokenProvider, AccessTokenProvider } from '@user/providers';
import { User } from '@user/entities';

import { AuthUserUseCase } from './AuthUserUseCase';

const user = new User(null);
const usersRepository = new MockUsersRepository();
const refreshTokenRepository = new MockRefreshTokenRepository();
const accessTokenProvider = new AccessTokenProvider();
const refreshTokenProvider = new RefreshTokenProvider(refreshTokenRepository);

const authUserUseCase = new AuthUserUseCase(
  usersRepository,
  refreshTokenRepository,
  refreshTokenProvider,
  accessTokenProvider,
  user
);

const mockUser = new User({
  name: 'test',
  email: 'test@test.com',
  password: '123'
});

const saveUser = async () => {
  usersRepository.save(mockUser);
};

const getUser = async () => {
  const { accessToken } = await accessTokenProvider.execute({
    id: mockUser.id
  });

  return { accessToken };
};

describe('Auth User', () => {
  it("should fail if there's not a jwt token", async () => {
    try {
      await authUserUseCase.loginToken(null);
    } catch (error) {
      expect(error.message).toBe('Please supply a jwt token.');
    }
  });

  it("should fail if there's not a bearer prefix", async () => {
    try {
      await authUserUseCase.loginToken(`dwdawdawdwa`);
    } catch (error) {
      expect(error.message).toBe('Your token must have the Bearer prefix.');
    }
  });

  it("should fail if there's no user with the id from the token", async () => {
    try {
      await authUserUseCase.loginToken(`Bearer erwerwerew`);
    } catch (error) {
      expect(error.message).toBe(
        'This access user account token is not valid.'
      );
    }
  });

  it("should fail if the passwords doesn't match", async () => {
    try {
      await saveUser();
      await authUserUseCase.execute({
        login: 'test@test.com',
        password: '456'
      });
    } catch (error) {
      expect(error.message).toBe('Wrong credentials.');
    }
  });

  it('should login with token', async () => {
    const { accessToken: token } = await getUser();

    const { message, accessToken, user } = await authUserUseCase.execute({
      login: null,
      password: null,
      token: `Bearer ${token}`
    });

    expect(message).toBe('User authenticated with success!');

    expect(user.id).toBe(mockUser.id);
    expect(user.name).toBe(mockUser.name);
    expect(user.email).toBe(mockUser.email);
    expect(user.password).toBe(mockUser.password);
    expect(user.username).toBe(mockUser.username);

    const validateAccessToken = accessTokenProvider.validate(accessToken);
    expect(validateAccessToken).toBeTruthy();
  });

  it("should fail if there's no user with the login", async () => {
    try {
      await authUserUseCase.signInLogin('dsadsada', '456');
    } catch (error) {
      expect(error.message).toBe('Wrong credentials.');
    }
  });

  // it('should be able to login with e-mail', async () => {
  //   const {
  //     accessToken,
  //     user,
  //     refreshToken,
  //     message
  //   } = await authUserUseCase.execute({
  //     login: 'test@test.com',
  //     password: '123'
  //   });

  //   expect(message).toBe('User authenticated with success!');
  //   expect(refreshToken).toBeTruthy();
  //   expect(accessToken).toBeTruthy();

  //   expect(user.id).toBe(mockUser.id);
  //   expect(user.name).toBe(mockUser.name);
  //   expect(user.email).toBe(mockUser.email);
  //   expect(user.username).toBe(mockUser.username);
  // });

  // it('should be able to login with username if e-mail fails', async () => {
  //   const {
  //     accessToken,
  //     user,
  //     refreshToken,
  //     message
  //   } = await authUserUseCase.execute({
  //     login: mockUser.username,
  //     password: '123'
  //   });

  //   expect(message).toBe('User authenticated with success!');
  //   expect(refreshToken).toBeTruthy();
  //   expect(accessToken).toBeTruthy();

  //   expect(user.id).toBe(mockUser.id);
  //   expect(user.name).toBe(mockUser.name);
  //   expect(user.email).toBe(mockUser.email);
  //   expect(user.username).toBe(mockUser.username);
  // });

  // it('should fail to auth user if credentials are wrongs', async () => {
  //   try {
  //     await authUserUseCase.execute({
  //       login: null,
  //       password: null
  //     });
  //   } catch (error) {}
  // });

  // it('should fail to auth user if credentials are wrongs', async () => {
  //   try {
  //     const { accessToken } = await getUser();

  //     await authUserUseCase.execute({
  //       login: null,
  //       password: null,
  //       token: accessToken
  //     });
  //   } catch (error) {}
  // });
});
