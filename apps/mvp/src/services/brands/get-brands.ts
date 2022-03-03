import { api } from '@services/api';

import { Brands } from '@src/types/brands';

type getBrandsResponse = {
  brands: Brands[];
};

export async function getBrandsRequest(): Promise<getBrandsResponse> {
  try {
    const { data: brands } = await api.get<Brands[]>('/brands');

    if (!brands) {
      return { brands: [] };
    }

    return {
      brands,
    };
  } catch (error) {
    // handle errors
    return { brands: [] };
  }
}
