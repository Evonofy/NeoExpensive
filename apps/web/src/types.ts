export type User = {
  name: string;
  email: string;
};

export type Error<T> = {
  field: T;
  message: string;
};
