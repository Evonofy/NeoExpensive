import { createContext, FC } from 'react';

import { useQuery } from 'react-query';
import { z } from 'zod';

import { api, withAuth, promise } from '@/services/api';

const ProductValidator = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  price: z.number(),
  cardPrice: z.number(),
  parts: z.number(),
  inStock: z.number(),
});

const CartProductValidator = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  quantity: z.number(),
  product: ProductValidator,
});

const cartArray = z.array(CartProductValidator);

export type CartProduct = z.infer<typeof CartProductValidator>;
export type Product = z.infer<typeof ProductValidator>;

type CartContext = {
  cart: CartProduct[];
  isLoading: boolean;

  actions: {
    updateItemQuantity: (cartProductId: string, quantity: number) => Promise<boolean>;
    removeItem: (cartProductId: string) => Promise<boolean>;
  };
};

export const CartContext = createContext<CartContext>({} as CartContext);

type CartContextProviderProps = {
  children: React.ReactNode;
};

export const CartContextProvider: FC<CartContextProviderProps> = ({ children }) => {
  const userId = 'e1e720af-9b52-4b86-a5a9-79da22c45ded';
  const token = '';

  const { data: cart, isLoading } = useQuery('cart', async () => {
    const { data: cartResponse } = await api.get<CartProduct[]>(withAuth(`/cart/${userId}`, token));
    return cartArray.parse(cartResponse);
  });

  const updateItemQuantity = async (cartProductId: string, quantity: number) => {
    const [result, error] = await promise(() =>
      api.put(`/cart/${userId}/${cartProductId}`, {
        quantity,
      })
    );

    if (error) {
      // handle
    }

    return result?.status === 200 ? true : false;
  };

  const removeItem = async (cartProductId: string) => {
    const [result, error] = await promise(() => api.delete(`/cart/${userId}/${cartProductId}`));

    if (error) {
      // handle
      // could return 404
    }

    return result?.status === 200 ? true : false;
  };

  return (
    <CartContext.Provider value={{ cart: cart ?? [], isLoading, actions: { updateItemQuantity, removeItem } }}>
      {children}
    </CartContext.Provider>
  );
};
