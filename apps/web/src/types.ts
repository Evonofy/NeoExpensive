export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Error<T> = {
  field: T;
  message: string;
};
