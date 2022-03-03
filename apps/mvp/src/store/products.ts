import create from 'zustand';

import { Product } from '@src/types/products';

type useProductsStoreProps = {
  products: Product[];
  setProducts(products: Product[]): void;
};

export const useProductsStore = create<useProductsStoreProps>((set) => ({
  products: [],
  setProducts(products) {
    set(() => ({
      products,
    }));
  },
}));
