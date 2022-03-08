import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, useContextSelector } from 'use-context-selector';

import { AuthContext } from '@context/auth';
import { ProductsContext } from '@context/products';
import { Button } from '@components/Button';

export default function Cart() {
  const navigate = useNavigate();
  const user = useContextSelector(AuthContext, (context) => context.user);
  const { clearCart, addProductToCart, removeOneProductQuantity, removeProductFromCart } = useContext(ProductsContext);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const total = useMemo(() => {
    // deduct price from coupons
    const totalProductsPrice = user?.cart?.map(({ price, quantity }) => price * quantity).reduce((previous, current) => previous + current, 0) || 0;

    return totalProductsPrice;
  }, [user?.cart]);

  return (
    <div>
      <main>
        <div>
          <ul>
            {user?.cart?.map(({ id, name, price, productId, quantity }) => (
              <li key={id}>
                <div>
                  {name} - {price}
                  <Button onClick={() => removeProductFromCart(productId)}>X</Button>
                </div>

                <div>{quantity}</div>

                <div>
                  <Button onClick={() => addProductToCart(productId)}>+</Button>
                  <Button disabled={quantity === 1} onClick={() => removeOneProductQuantity(productId)}>
                    -
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button onClick={clearCart}>Clean cart</Button>
        </div>
      </main>

      <aside>
        <div>
          <h3>${total - total * 0.1}</h3>
        </div>

        <div>
          <h3>${total - total * 0.1}</h3>
          <p>12x de ${((total - total * 0.1) / 10).toFixed(2)}</p>
          <p>sem juros</p>
        </div>

        <div>
          <h3>${total}</h3>
          <p>10% de desconto</p>
        </div>
      </aside>
    </div>
  );
}
