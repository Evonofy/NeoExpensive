import { useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { ThemeContext } from '@context/theme';
import { ProductsContext } from '@context/products';

import { getBrandsRequest } from '@services/brands/get-brands';
import { getCategoriesRequest } from '@services/categories/get-categories';
import { styled } from '@styles/stitches.config';

const Container = styled('div', {
  color: '$gray100',
  background: '$gray800',
});

function Home() {
  const cycle = useContextSelector(ThemeContext, (context) => context.cycle);
  const products = useContextSelector(ProductsContext, (context) => context.products);

  const { data: brands } = useQuery('brands', async () => {
    const { brands } = await getBrandsRequest();

    return brands;
  });

  const { data: categories } = useQuery('categories', async () => {
    const { categories } = await getCategoriesRequest();

    return categories;
  });

  const featuredProducts = useMemo(() => {
    const mostRatedProducts = products.sort((previous, next) => {
      return previous.rating > next.rating ? 0 : 1;
    });

    return mostRatedProducts.slice(0, 4);
  }, [products]);

  const featuredBrands = useMemo(() => {
    if (!brands) {
      return [];
    }

    return brands.slice(0, 4);
  }, [brands]);

  return (
    <Container>
      <p>homepage</p>
      <Link to="/login">go to login</Link>
      <button onClick={cycle}>change theme</button>
      <ul>
        {featuredProducts.map(({ id, name, price }) => (
          <li key={id}>
            {name} - {price}
          </li>
        ))}
      </ul>

      <h1>compre por marca</h1>
      <ul>
        {featuredBrands.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <h1>compre por categoria</h1>
      <ul>
        {categories?.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <h1>melhores ofertas</h1>
      <ul>
        {products.map(({ id, name, price }) => (
          <li key={id}>
            {name} - {price}
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default memo(Home);
