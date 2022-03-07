import create from 'zustand';
import { v4 as uuid } from 'uuid';

import { User, Cart, Address, Card, Order } from '@src/types/auth';
import { Product } from '@src/types/products';

type useAuthStoreProps = {
  user: User | null;

  setUser(user: User): void;
  removeUser(): void;

  addAddress(address: Address): void;
  removeAddress(id: string): void;

  addCard(card: Card): void;
  removeCard(id: string): void;

  addOrder(order: Order): void;

  removeAllProductsFromCart(): void;
  pushToCart(product: Product): void;
  popFromCart(id: string): void;
  removeOneProductQuantityFromCart(id: string): void;
};

export const useAuthStore = create<useAuthStoreProps>((set) => ({
  user: null,
  setUser(user) {
    set(() => ({
      user,
    }));
  },
  addOrder(order) {
    set(({ user }) => ({
      user: {
        ...user!,
        orders: user?.orders ? [...user.orders, order] : [order],
      },
    }));
  },
  removeUser() {
    set(() => ({
      user: null,
    }));
  },
  addCard(card) {
    set(({ user }) => {
      return {
        user: {
          ...user!,
          cards: user?.cards ? [...user.cards, card] : [card],
        },
      };
    });
  },
  removeCard(id) {
    set(({ user }) => ({
      user: {
        ...user!,
        cards: user?.cards?.filter((card) => card.id !== id),
      },
    }));
  },
  addAddress(address) {
    set(({ user }) => {
      return {
        user: {
          ...user!,
          addresses: user?.addresses ? [...user.addresses, address] : [address],
        },
      };
    });
  },
  removeAddress(id) {
    set(({ user }) => ({
      user: {
        ...user!,
        addresses: user?.addresses?.filter((address) => address.id !== id),
      },
    }));
  },
  removeAllProductsFromCart() {
    set(({ user }) => ({
      user: {
        ...user!,
        cart: [],
      },
    }));
  },
  removeOneProductQuantityFromCart(id: string) {
    set(({ user }) => {
      const cart = user?.cart?.map(({ productId, quantity, ...rest }) => {
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
      });

      return {
        user: {
          ...user!,
          cart,
        },
      };
    });
  },
  pushToCart(product) {
    set(({ user }) => {
      let cart: Cart[] = [];

      if (user?.cart?.find(({ productId }) => product.id === productId)) {
        cart = user.cart.map(({ quantity, ...rest }) => ({
          ...rest,
          quantity: quantity + 1,
        }));

        return {
          user: {
            ...user!,
            cart,
          },
        };
      }

      cart = [
        {
          ...product,
          productId: product.id,
          id: uuid(),
          quantity: 1,
        },
      ];

      if (user?.cart) {
        cart = [
          ...user?.cart,
          {
            ...product,
            id: uuid(),
            productId: product.id,
            quantity: 1,
          },
        ];
      }

      return {
        user: {
          ...user!,
          cart,
        },
      };
    });
  },
  popFromCart(id) {
    set(({ user }) => {
      return {
        user: {
          ...user!,
          cart: user?.cart?.filter((product) => product.productId !== id),
        },
      };
    });
  },
}));
