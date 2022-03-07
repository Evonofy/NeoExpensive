import { FC, useCallback } from 'react';
import { createContext } from 'use-context-selector';
import { v4 as uuid } from 'uuid';

import { useProductsStore } from '@store/products';
import { useAuthStore } from '@store/auth';
import { User, Address, Card, Coupon, Order, Cart } from '@src/types/auth';
import { Product } from '@src/types/products';
import { Category } from '@src/types/categories';

type CreateOrderProps = {
  selectedCardId: string;
  selectedAddressId: string;
  total: number;
  coupons: Coupon[];
  cart: Cart[];
};

type ProductsContextProps = {
  products: Product[];
  categories: Category[];

  addAddress(data: Omit<Address, 'id'>): void;
  removeAddress(id: string): void;

  addCard(data: Omit<Card, 'id'>): void;
  removeCard(id: string): void;

  createOrder(data: CreateOrderProps): void;

  clearCart(): void;
  addProductToCart(id: string): void;
  removeProductFromCart(id: string): void;
  removeOneProductQuantity(id: string): void;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider: FC = ({ children }) => {
  const { pushToCart, user, popFromCart, removeOneProductQuantityFromCart, removeAllProductsFromCart, addAddress: addStoreAddress, removeAddress: removeStoreAddress, addCard: addStoreCard, removeCard: removeStoreCard, addOrder } = useAuthStore();
  const { products, categories } = useProductsStore();

  const addProductToCart = useCallback(
    (id: string) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      const product = products.find((product) => id === product.id);

      if (product) {
        pushToCart(product);
      }

      if (user?.cart?.find(({ productId }) => id === productId)) {
        localStorage.setItem(
          '@neo:user',
          JSON.stringify([
            ...users.filter((user) => user.id !== loggedUser),
            {
              ...user,
              cart: user.cart.map(({ quantity, productId, ...rest }) => ({
                ...rest,
                quantity: productId === id ? quantity + 1 : quantity,
              })),
            },
          ])
        );

        return;
      }

      localStorage.setItem('@neo:user', JSON.stringify([...users.filter((user) => user.id !== loggedUser), user]));
    },
    [products, pushToCart, user]
  );

  const removeProductFromCart = useCallback(
    (id: string) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      popFromCart(id);
      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            cart: user?.cart?.filter((product) => product.id !== id),
          },
        ])
      );
    },
    [popFromCart, user]
  );

  const removeOneProductQuantity = useCallback(
    (id: string) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      removeOneProductQuantityFromCart(id);

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            cart: user?.cart?.map(({ productId, quantity, ...rest }) => {
              if (id === productId) {
                return {
                  productId,
                  quantity: quantity - 1,
                  ...rest,
                };
              }

              return {
                productId,
                quantity,
                ...rest,
              };
            }),
          },
        ])
      );
    },
    [removeOneProductQuantityFromCart, user]
  );

  const clearCart = useCallback(() => {
    removeAllProductsFromCart();

    const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
    const loggedUser = localStorage.getItem('@neo:logged');

    localStorage.setItem(
      '@neo:user',
      JSON.stringify([
        ...users.filter((user) => user.id !== loggedUser),
        {
          ...user,
          cart: [],
        },
      ])
    );
  }, [removeAllProductsFromCart, user]);

  const addAddress = useCallback(
    (address: Omit<Address, 'id'>) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      addStoreAddress({
        id: uuid(),
        ...address,
      });

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            addresses: user?.addresses ? [...user?.addresses, address] : [address],
          },
        ])
      );
    },
    [addStoreAddress, user]
  );

  const removeAddress = useCallback(
    (id: string) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      removeStoreAddress(id);

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            addresses: user?.addresses?.filter((address) => address.id !== id),
          },
        ])
      );
    },
    [removeStoreAddress, user]
  );

  const addCard = useCallback(
    (card: Omit<Card, 'id'>) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      addStoreCard({
        id: uuid(),
        ...card,
      });

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            cards: user?.cards ? [...user?.cards, card] : [card],
          },
        ])
      );
    },
    [addStoreCard, user]
  );

  const removeCard = useCallback(
    (id: string) => {
      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      removeStoreCard(id);

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            cards: user?.cards?.filter((card) => card.id !== id),
          },
        ])
      );
    },
    [removeStoreCard, user]
  );

  const createOrder = useCallback(
    (data: CreateOrderProps) => {
      const { cart, coupons, total, selectedAddressId, selectedCardId } = data;

      const order: Order = {
        id: uuid(),
        total,
        card: user?.cards?.find((card) => selectedCardId === card.id)!,
        cart,
        address: user?.addresses?.find((address) => selectedAddressId === address.id)!,
        coupons,
      };

      const users = JSON.parse(localStorage.getItem('@neo:user') || '[]') as User[];
      const loggedUser = localStorage.getItem('@neo:logged');

      addOrder(order);

      localStorage.setItem(
        '@neo:user',
        JSON.stringify([
          ...users.filter((user) => user.id !== loggedUser),
          {
            ...user,
            orders: user?.orders ? [...user?.orders, order] : [order],
          },
        ])
      );
    },
    [addOrder, user]
  );

  return <ProductsContext.Provider value={{ products, addProductToCart, removeProductFromCart, removeOneProductQuantity, clearCart, addAddress, removeAddress, addCard, removeCard, createOrder, categories }}>{children}</ProductsContext.Provider>;
};
