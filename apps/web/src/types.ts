export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  githubId?: string;
};

export type Theme = string;

export type Settings = {
  theme: Theme;
  language: string;
};

export type Error<T> = {
  field: T;
  message: string;
};

export type RefreshToken = {
  id: string;
  userid: string;
  platform?: Navigator['userAgentData']['platform'];
  expiresIn: number;
};
