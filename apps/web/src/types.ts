export type User = {
  name: string;
  email: string;
};

export type Error = {
  field: 'email' | 'password';
  message: string;
};
