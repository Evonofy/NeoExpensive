import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';

import { ProductsContext } from '@context/products';
import { AuthContext } from '@context/auth';
import { useEffect } from 'react';

export default function Profile() {
  const navigate = useNavigate();

  const products = useContextSelector(ProductsContext, (context) => context.products);
  const removeProductFromCart = useContextSelector(ProductsContext, (context) => context.removeProductFromCart);
  const addProductToCart = useContextSelector(ProductsContext, (context) => context.addProductToCart);
  const removeOneProductQuantity = useContextSelector(ProductsContext, (context) => context.removeOneProductQuantity);
  const user = useContextSelector(AuthContext, (context) => context.user);
  const logout = useContextSelector(AuthContext, (context) => context.logout);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div>
      <p>profile page</p>

      <div>{user?.name}</div>
      <div>{user?.email}</div>

      <button onClick={logout}>logout</button>

      <h1>compras - {user?.orders?.length}</h1>
      <ul>
        {user?.orders?.map(({ id, total }) => {
          return (
            <li key={id}>
              <div>{total}</div>
            </li>
          );
        })}
      </ul>

      <h1>ratings</h1>
      <ul>
        {user?.ratings?.map(({ id, productId, description }) => {
          const product = products.find(({ id }) => productId === id);

          return (
            <li key={id}>
              <strong>{product?.name}</strong>
              <div>{description}</div>
            </li>
          );
        })}
      </ul>

      <h1>carrinho - {user?.cart?.length}</h1>
      <ul>
        {user?.cart?.map(({ id, name, price, rating, quantity, productId }) => {
          return (
            <li key={id}>
              <strong>{name}</strong>
              <div>{price}</div>
              <div>{rating}</div>
              <div>
                <button onClick={() => addProductToCart(productId)}>+</button>
                <button disabled={quantity === 1} onClick={() => removeOneProductQuantity(productId)}>
                  -
                </button>
              </div>
              <p>quantity: {quantity}</p>
              <button onClick={() => navigate('/checkout')}>comprar</button>
              <button onClick={() => removeProductFromCart(productId)}>remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
