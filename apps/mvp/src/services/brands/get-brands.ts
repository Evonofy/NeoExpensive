import { Brands } from '@src/types/brands';

type getBrandsResponse = {
  brands: Brands[];
};

export async function getBrandsRequest(): Promise<getBrandsResponse> {
  try {
    const brands = [
      {
        id: '1',
        name: 'AMD',
      },
      {
        id: '3',
        name: 'NVIDIA',
      },
      {
        id: '2',
        name: 'Redragon',
      },
      {
        id: '4',
        name: 'Intel',
      },
    ];

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
