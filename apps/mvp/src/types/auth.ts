export type User = {
  id: string;
};

export type FieldError<T> = {
  field: T;
  message: string;
};
