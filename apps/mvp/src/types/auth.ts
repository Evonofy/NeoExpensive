import { Product } from './products';

export type User = {
  id: string;

  name: string;
  email: string;
  cpf: string;
  birthDate: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;

  ratings?: Rating[];
  cart?: Cart[];
  orders?: Order[];
  cards?: Card[];
  coupons?: Coupon[];
  addresses?: Address[];
};

export type Address = {
  id: string;
  street: string;
  neighborhood: string;
  cep: string;
};

export type Cart = Product & {
  productId: string;
  quantity: number;
};

export type Card = {
  id: string;

  number: string;
  expiration: string;
  cvv: string;
};

export type Coupon = {
  id: string;
  title: string;
  price: number;
};

export type Order = {
  id: string;
  total: number;
  cart: Cart[];
  card: Card;
  address: Address;
  coupons: Coupon[];
};

type Rating = {
  id: string;
  productId: string;

  description: string;
};

export type FieldError<T> = {
  field: T;
  message: string;
};
