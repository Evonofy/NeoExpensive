import { useMemo, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { AuthContext } from '@context/auth';
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
  const navigate = useNavigate();

  const user = useContextSelector(AuthContext, (context) => context.user);
  const logout = useContextSelector(AuthContext, (context) => context.logout);
  const cycle = useContextSelector(ThemeContext, (context) => context.cycle);
  const products = useContextSelector(ProductsContext, (context) => context.products);
  const addProductToCart = useContextSelector(ProductsContext, (context) => context.addProductToCart);

  const handleAddProductToCart = useCallback(
    (id: string) => {
      addProductToCart(id);
    },
    [addProductToCart]
  );

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
      <div>
        <p>homepage</p>
      </div>
      <div>
        <p>{user?.name}</p>
      </div>
      <div>
        items in your cart
        {user?.cart?.length}
      </div>
      {user && <button onClick={logout}>logout</button>}
      <div>
        <Link to="/login">go to login</Link>
      </div>
      {user && (
        <div>
          <Link to="/profile">go to profile</Link>
        </div>
      )}
      {user?.cart && (
        <div>
          <Link to="/checkout">go to checkout</Link>
        </div>
      )}
      <div>
        <Link to="/register">create a account</Link>
      </div>
      <div>
        <Link to="/password/forgot">forgot my password</Link>
      </div>
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
          <li key={id}>
            <div>{name}</div>
          </li>
        ))}
      </ul>

      <h1>melhores ofertas</h1>
      <ul>
        {products.map(({ id, name, price }) => (
          <li key={id}>
            <div>
              <button onClick={() => navigate(`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`)}>buy</button>
              <button onClick={() => handleAddProductToCart(id)}>add to cart</button>
              {name} - {price}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default memo(Home);
