import { api } from '@services/api';

import { Category } from '@src/types/categories';

type getCategoriesResponse = {
  categories: Category[];
};

export async function getCategoriesRequest(): Promise<getCategoriesResponse> {
  try {
    const { data: categories } = await api.get<Category[]>('/categories');

    if (!categories) {
      return { categories: [] };
    }

    return {
      categories,
    };
  } catch (error) {
    // handle errors
    return { categories: [] };
  }
}
