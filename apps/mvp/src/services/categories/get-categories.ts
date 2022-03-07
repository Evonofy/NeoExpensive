import { Category } from '@src/types/categories';

type getCategoriesResponse = {
  categories: Category[];
};

export async function getCategoriesRequest(): Promise<getCategoriesResponse> {
  try {
    const categories = [
      {
        id: '1',
        name: 'Hardware',
      },
      {
        id: '2',
        name: 'Periféricos',
      },
      {
        id: '3',
        name: 'Consoles',
      },
      {
        id: '4',
        name: 'Acessórios',
      },
      {
        id: '5',
        name: 'Gamer',
      },
      {
        id: '6',
        name: 'Tech',
      },
    ];

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
