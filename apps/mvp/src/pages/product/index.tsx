import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import ReactImageZoom from 'react-image-zoom';

import { Product as IProduct } from '@src/types/products';
import { ProductsContext } from '@context/products';

import { Button } from '@components/Button';
import { Link } from '@components/Link';

import CreditCart from '../../images/pages/product-template/credit-card.svg';
import Wallet from '../../images/pages/product-template/wallet.svg';
import Truck from '../../images/pages/product-template/truck.svg';
import Receipt from '../../images/pages/main/products/receipt.svg';
import ShoppingCart from '../../images/components/header/user-controls/shopping-cart.svg';

export default function Product() {
  const products = useContextSelector(ProductsContext, (context) => context.products);
  const addProductToCart = useContextSelector(ProductsContext, (context) => context.addProductToCart);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const navigate = useNavigate();
  const params = useParams() as {
    slug: string;
  };

  const product = useMemo(() => {
    return products.find((product) => product.name.toLowerCase().split(', ').join('-').split(' ').join('-') === params.slug);
  }, [params.slug, products]);

  const relatedProducts = useMemo(() => {
    const relatedProducts: IProduct[] = [];

    product?.tags.forEach((tag) => {
      products.forEach(({ tags, ...rest }) => {
        if (tags.includes(tag)) {
          relatedProducts.push({
            tags,
            ...rest,
          });
        }
      });
    });

    return relatedProducts.slice(0, 3);
  }, [product?.tags, products]);

  return (
    <main className="product--display--grid">
      <div className="product--preview">
        <img style={{ cursor: 'pointer', border: selectedImageIndex === 0 ? '4px solid #9540BF' : '' }} src={product?.image} onClick={() => setSelectedImageIndex(0)} alt="" className="product--preview--image" />
        <img style={{ cursor: 'pointer', border: selectedImageIndex === 1 ? '4px solid #9540BF' : '' }} src={product?.altImages[0]} onClick={() => setSelectedImageIndex(1)} alt="" className="product--preview--image" />
        <img style={{ cursor: 'pointer', border: selectedImageIndex === 2 ? '4px solid #9540BF' : '' }} src={product?.altImages[1]} onClick={() => setSelectedImageIndex(2)} alt="" className="product--preview--image" />
        <img style={{ cursor: 'pointer', border: selectedImageIndex === 3 ? '4px solid #9540BF' : '' }} src={product?.altImages[2]} onClick={() => setSelectedImageIndex(3)} alt="" className="product--preview--image" />
      </div>

      <section className="product--display">
        {selectedImageIndex === 0 ? (
          <ReactImageZoom width={400} height={400} zoomWidth={300} scale={1.5} img={product?.image} className="product--display--image" />
        ) : (
          <ReactImageZoom width={400} height={400} zoomWidth={300} scale={1.5} img={product?.altImages[selectedImageIndex - 1]} className="product--display--image" />
        )}
        {/* <img src={product?.image} alt="" className="product--display--image" /> */}
      </section>

      <aside className="product--aside">
        <div className="product--aside--wrapper">
          <div className="product--aside--image--wrapper">{selectedImageIndex === 0 ? <img src={product?.image} alt="" className="product--aside--image"></img> : <img src={product?.altImages[selectedImageIndex - 1]} alt="" className="product--aside--image"></img>}</div>
          <h2 className="product--aside--name">{product?.name}</h2>

          <div className="rating--css">
            <div className="star--icon">
              {product?.rating === 1 && (
                <React.Fragment>
                  <input type="radio" name="rating1" id="rating1" />
                  <label htmlFor="rating1" className="fa fa-star" />
                </React.Fragment>
              )}

              {product?.rating === 2 && (
                <React.Fragment>
                  <input type="radio" name="rating1" id="rating2" />
                  <label htmlFor="rating2" className="fa fa-star" />
                </React.Fragment>
              )}

              {product?.rating === 3 && (
                <React.Fragment>
                  <input type="radio" name="rating1" id="rating3" />
                  <label htmlFor="rating3" className="fa fa-star" />
                </React.Fragment>
              )}

              {product?.rating === 4 && (
                <React.Fragment>
                  <input type="radio" name="rating1" id="rating4" />
                  <label htmlFor="rating4" className="fa fa-star" />
                </React.Fragment>
              )}

              {product?.rating === 5 && (
                <React.Fragment>
                  <input type="radio" name="rating1" id="rating5" />
                  <label htmlFor="rating5" className="fa fa-star" />
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="product--aside--payment">
            <p className="product--aside--payment--promo">
              <span className="span--promo">de R$ {product?.price.toFixed(2)} por:</span>
            </p>

            <div className="product--aside--payment--price">
              <img src={CreditCart} alt="" className="product--aside--payment--image" />
              <h2 className="product--aside--payment--h2">
                <span className="span--price">R$ {(product?.price! - product?.price! * 0.1).toFixed(2)}</span>
              </h2>
            </div>
            <p className="product--aside--payment--installment">12x de R$ {((product?.price! - product?.price! * 0.1) / 12).toFixed(2)} s/juros no cartão</p>
          </div>

          <div className="product--aside--payment">
            <div className="product--aside--payment--price">
              <img src={Wallet} alt="" className="product--aside--payment--image" />
              <h2 className="product--aside--payment--h2">
                <span className="span--money">R$ {(product?.price! - product?.price! * 0.2).toFixed(2)}</span>
              </h2>
            </div>
            <p className="product--aside--payment--installment">À vista com 10% de desconto no boleto ou pix</p>
          </div>

          <div className="product--aside--payment">
            <div className="product--aside--payment--price">
              <img src={Truck} alt="" className="product--aside--payment--image" />
              <h2 className="product--aside--payment--h2">Frete Grátis</h2>
            </div>

            <p className="product--aside--payment--installment">Saiba os prazos de entrega e as formas de envio.</p>
          </div>

          <div className="product--card--button--wrapper product--aside--button">
            <Link href={`/checkout/${product?.id}`} className="product--card--buy">
              <img src={Receipt} alt="" className="product--card--label" />
              Comprar
            </Link>

            <button onClick={() => addProductToCart(product?.id!)} className="product--card--cart">
              <img src={ShoppingCart} alt="" className="product--card--label" />
            </button>
          </div>
        </div>
      </aside>

      <section className="section--description">
        <h2 className="product--details--link">Descrição</h2>
        <p className="product--description" id="product--desc">
          {product?.description}
        </p>
      </section>

      <section className="section--specification">
        <h2 className="product--details--link">Especificações</h2>

        <div className="product--specification--wrapper">
          <div className="product--specification">
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: Ativo</p>
          </div>
          <div className="product--specification">
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: Ativo</p>
          </div>
          <div className="product--specification">
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: BFG</p>
            <p className="product--specification--paragraph">Marca: Ativo</p>
          </div>
        </div>
      </section>

      <section className="section--reviews">
        <h2 className="product--details--link">Avaliações</h2>

        <div className="user--review--card">
          <div className="user--review--wrapper">
            <div className="rating--css">
              <div className="star--icon">
                {product?.rating === 1 && (
                  <React.Fragment>
                    <input type="radio" name="rating1" id="rating1" />
                    <label htmlFor="rating1" className="fa fa-star" />
                  </React.Fragment>
                )}

                {product?.rating === 2 && (
                  <React.Fragment>
                    <input type="radio" name="rating1" id="rating2" />
                    <label htmlFor="rating2" className="fa fa-star" />
                  </React.Fragment>
                )}

                {product?.rating === 3 && (
                  <React.Fragment>
                    <input type="radio" name="rating1" id="rating3" />
                    <label htmlFor="rating3" className="fa fa-star" />
                  </React.Fragment>
                )}

                {product?.rating === 4 && (
                  <React.Fragment>
                    <input type="radio" name="rating1" id="rating4" />
                    <label htmlFor="rating4" className="fa fa-star" />
                  </React.Fragment>
                )}

                {product?.rating === 5 && (
                  <React.Fragment>
                    <input type="radio" name="rating1" id="rating5" />
                    <label htmlFor="rating5" className="fa fa-star" />
                  </React.Fragment>
                )}

                <p className="review--paragraph">
                  Ótimo Produto <span className="review--numbers">4 Avaliações</span>
                </p>
              </div>
            </div>

            <button className="review--button">Faça Sua Avaliação!</button>
          </div>

          <div className="review--card">
            <img src="../../images/pages/product-template/Emoji.png" alt="" className="review--card--image" />

            <div className="review--card--text">
              <h2 className="review--card--h3">
                Pedro Avaliações <span className="review--card--date">12/11/2021</span>
              </h2>
              <p className="review--card--h3">Pedro Avaliações</p>
            </div>

            <div className="rating--css margin-left-auto margin-bottom-auto">
              <div className="star--icon">
                <input type="radio" name="rating1" id="rating1" />
                <label htmlFor="rating1" className="fa fa-star" />
                <input type="radio" name="rating1" id="rating2" />
                <label htmlFor="rating2" className="fa fa-star" />
                <input type="radio" name="rating1" id="rating3" />
                <label htmlFor="rating3" className="fa fa-star" />
                <input type="radio" name="rating1" id="rating4" />
                <label htmlFor="rating4" className="fa fa-star" />
                <input type="radio" name="rating1" id="rating5" />
                <label htmlFor="rating5" className="fa fa-star" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
