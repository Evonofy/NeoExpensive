import { api } from '@services/api';

import { Product } from '@src/types/products';

type getProductsResponse = {
  products: Product[];
};

export async function getProductsRequest(): Promise<getProductsResponse> {
  try {
    const { data: products } = await api.get<Product[]>('/products');

    if (!products) {
      return { products: [] };
    }

    return {
      products,
    };
  } catch (error) {
    // handle errors
    return { products: [] };
  }
}
