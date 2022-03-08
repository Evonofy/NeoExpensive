import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';

import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { ProductsContext } from '@context/products';
import { AuthContext } from '@context/auth';
import { styled } from '@src/styles/stitches.config';

import Emoji from '../../../images/pages/product-template/Emoji.png';
import { Product } from '@src/types/products';

const Container = styled('div');

export default function Profile() {
  const navigate = useNavigate();

  const products = useContextSelector(ProductsContext, (context) => context.products);
  const removeProductFromCart = useContextSelector(ProductsContext, (context) => context.removeProductFromCart);
  const addProductToCart = useContextSelector(ProductsContext, (context) => context.addProductToCart);
  const removeOneProductQuantity = useContextSelector(ProductsContext, (context) => context.removeOneProductQuantity);
  const user = useContextSelector(AuthContext, (context) => context.user);
  const logout = useContextSelector(AuthContext, (context) => context.logout);

  const [currentTab, setCurrentTab] = useState<'orders' | 'ratings' | 'cart' | 'settings'>('orders');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const allOrderProducts = useMemo(() => {
    const products: Product[] = [];

    user?.orders?.forEach(({ cart }) => {
      cart.map(({ id, ...rest }) => {
        if (products.find((product) => product.id === id)) {
          // add quantity
          return;
        }

        products.push({
          id,
          ...rest,
        });
      });
    });

    return products;
  }, [user?.orders]);

  return (
    <Container>
      <section className="profile--banner"></section>

      <div className="profile--avatar">
        <img src={`https://avatars.dicebear.com/api/identicon/${user?.id}.svg` || Emoji} alt="" className="profile--avatar--image" />
        <h2 className="profile--name">
          Bem-vindo(a) ao seu perfil <span>{user?.name}</span>
        </h2>
      </div>

      <div className="profile--purchase--options">
        <div onClick={() => setCurrentTab('orders')} className="profile--purchase--category">
          <p className="profile--purchase--history purchaseHistory">Compras</p>
        </div>

        <div onClick={() => setCurrentTab('ratings')} className="profile--purchase--category">
          <p className="profile--purchase--history reviewHistory">Avaliações</p>
        </div>

        <div onClick={() => setCurrentTab('cart')} className="profile--purchase--category">
          <p className="profile--purchase--history reviewHistory">Carrinho</p>
        </div>

        <div onClick={() => setCurrentTab('settings')} className="profile--purchase--category">
          <p className="profile--purchase--history reviewHistory">Settings</p>
        </div>
      </div>

      {currentTab === 'orders' && (
        <div className="profile--purchase--wrapper purchaseWrapper">
          {allOrderProducts.length === 0 && (
            <div>
              <p>looks like you {"haven't"} ordered anything yet...</p>
              <Link href="/">
                <Button>see some special deals</Button>
              </Link>
            </div>
          )}
          {allOrderProducts.map(({ id, name, image, price }) => (
            <div key={id} className="profile--purchase">
              <Link href={`${name.toLowerCase().split(', ').join('-').split(' ').join('-')}}`} className="profile--history--card">
                <img src={image} alt="" className="profile--product" />
              </Link>

              <div className="profile--history--card">
                <p className="profile--history--card--paragraph">{name}</p>
                <p className="profile--history--card--price">R$ {price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentTab === 'ratings' && (
        <div className="profile--review--wrapper reviewWrapper">
          {user?.ratings?.map(({ id, productId, description }) => {
            const product = products.find((product) => product.id === productId);

            return (
              product && (
                <div key={id} className="profile--purchase">
                  <Link href="#" className="profile--history--card">
                    <img src={product?.image} alt="" className="profile--product" />
                  </Link>

                  <div className="profile--history--card">
                    <p className="profile--history--card--paragraph">{product.name}</p>
                    <p className="profile--history--card--paragraph">{description}</p>

                    <div className="rating--css rating--profile">
                      <div className="star--icon star--profile">
                        {product.rating === 1 && (
                          <React.Fragment>
                            <input type="radio" name="rating1" id="rating1" />
                            <label htmlFor="rating1" className="fa fa-star" />
                          </React.Fragment>
                        )}

                        {product.rating === 2 && (
                          <React.Fragment>
                            <input type="radio" name="rating1" id="rating2" />
                            <label htmlFor="rating2" className="fa fa-star" />
                          </React.Fragment>
                        )}

                        {product.rating === 3 && (
                          <React.Fragment>
                            <input type="radio" name="rating1" id="rating3" />
                            <label htmlFor="rating3" className="fa fa-star" />
                          </React.Fragment>
                        )}

                        {product.rating === 4 && (
                          <React.Fragment>
                            <input type="radio" name="rating1" id="rating4" />
                            <label htmlFor="rating4" className="fa fa-star" />
                          </React.Fragment>
                        )}

                        {product.rating === 5 && (
                          <React.Fragment>
                            <input type="radio" name="rating1" id="rating5" />
                            <label htmlFor="rating5" className="fa fa-star" />
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}

      {currentTab === 'cart' && (
        <div className="profile--purchase--wrapper purchaseWrapper">
          {user?.cart?.map(({ id, name, image, price, quantity, productId }) => (
            <div key={id} className="profile--purchase">
              <Link href={`${name.toLowerCase().split(', ').join('-').split(' ').join('-')}}`} className="profile--history--card">
                <img src={image} alt="" className="profile--product" />
              </Link>

              <div className="profile--history--card">
                <p className="profile--history--card--paragraph">{name}</p>
                <p className="profile--history--card--price">R$ {price}</p>
              </div>
              {quantity}
              <div>
                <button onClick={() => addProductToCart(productId)}>+</button>
                <button disabled={quantity === 1} onClick={() => removeOneProductQuantity(productId)}>
                  -
                </button>
              </div>

              <button onClick={() => navigate('/checkout')}>comprar</button>
              <button onClick={() => removeProductFromCart(productId)}>remove</button>
            </div>
          ))}
        </div>
      )}

      {currentTab === 'settings' && (
        <div>
          <Button onClick={logout}>logout</Button>
        </div>
      )}
    </Container>
  );
}
