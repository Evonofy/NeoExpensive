import { FC } from 'react';
import { createContext } from 'use-context-selector';
import { useQuery } from 'react-query';

import { useProductsStore } from '@store/products';
import { Product } from '@src/types/products';

import { getProductsRequest } from '@services/products/get-products';

type ProductsContextProps = {
  products: Product[];
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider: FC = ({ children }) => {
  const { products, setProducts } = useProductsStore();

  useQuery('products', async () => {
    const { products } = await getProductsRequest();

    setProducts(products);

    return products;
  });

  return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};
