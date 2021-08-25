import { RefreshToken as RefreshTokenORM } from '@infra/prisma';

export type RefreshTokenRequest = string;

export type RefreshTokenResponse = RefreshTokenORM;
