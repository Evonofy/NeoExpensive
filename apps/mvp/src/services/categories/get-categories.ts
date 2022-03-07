import { Category } from '@src/types/categories';

type getCategoriesResponse = {
  categories: Category[];
};

export function getCategoriesRequest(): getCategoriesResponse {
  const categories = [
    {
      id: '1',
      name: 'Hardware',
    },
    {
      id: '5',
      name: 'Gamer',
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
  ];

  return {
    categories,
  };
}
