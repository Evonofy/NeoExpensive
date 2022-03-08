import React, { useMemo, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { ProductsContext } from '@context/products';

import { Link } from '@components/Link';
import { getBrandsRequest } from '@services/brands/get-brands';

import shoppingCart from '../../images/components/header/user-controls/shopping-cart.svg';
import receipt from '../../images/components/header/user-controls/shopping-cart.svg';
import { Category } from '@src/types/categories';

function Home() {
  const navigate = useNavigate();

  const products = useContextSelector(ProductsContext, (context) => context.products);
  const categories = useContextSelector(ProductsContext, (context) => context.categories);
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

  const categoriesThatHaveProducts = useMemo(() => {
    const validCategories: Category[] = [];

    products.forEach(({ tags }) => {
      categories?.forEach(({ id, name }) => {
        if (tags.includes(name.toLocaleLowerCase())) {
          if (validCategories.find((category) => category.id === id)) {
            return;
          }

          validCategories.push({
            id,
            name,
          });
        }
      });
    });

    return validCategories;
  }, [categories, products]);

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
    <React.Fragment>
      <header className="main--banner"></header>

      <main className="main">
        <section className="main--products">
          {featuredProducts.map(({ id, name, price, image, tags }) => {
            return (
              <div key={id} className="product--card">
                <Link href={`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`} className="product--card--image">
                  <img src={image} alt="" />
                </Link>

                <div className="product--card--desc">
                  <h2 className="product--card--title">{name}</h2>
                  {tags.slice(0, 3).map((tag) => (
                    <Link key={tag} href={`/tags/${tag.replace(' ', '-')}`} className="product--category">
                      {tag}
                    </Link>
                  ))}
                  <p className="product--card--paragraph">R$ {price.toFixed(2)}</p>

                  <div className="product--card--button--wrapper">
                    <button onClick={() => navigate(`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`)} className="product--card--buy">
                      <img src={receipt} alt="" className="product--card--label" />
                      Comprar
                    </button>

                    <button onClick={() => handleAddProductToCart(id)} className="product--card--cart">
                      <img src={shoppingCart} alt="" className="product--card--label" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <h1 className="main--title">Compre Por Marca</h1>

        <section className="main--per--category">
          {featuredBrands.map(({ id, name }) => (
            <div key={id} className={`main--category--card ${name.toLocaleLowerCase()}`}>
              <Link href={`/brand/${name.toLocaleLowerCase()}`} className={`main--category--card--label ${name.toLocaleLowerCase()}--hover`}>
                <p className="main--category--card--label--text">{name}</p>
              </Link>
            </div>
          ))}
        </section>

        <h1 className="main--title">Compre Por Departamento</h1>

        <section className="main--per--department">
          <div className="main--department--card hardware--image">
            <a href="#" className="main--department--card--label">
              <p className="main--department--card--label--text">Hardware</p>
            </a>
          </div>

          <div className="main--department--card intel--sec peripherals--image">
            <a href="#" className="main--department--card--label">
              <p className="main--department--card--label--text">Periféricos</p>
            </a>
          </div>

          <div className="main--department--card console--image">
            <a href="#" className="main--department--card--label">
              <p className="main--department--card--label--text">Consoles</p>
            </a>
          </div>

          <div className="main--department--card amd--red accessories--image">
            <a href="#" className="main--department--card--label">
              <p className="main--department--card--label--text">Acessórios</p>
            </a>
          </div>
        </section>

        <h1 className="main--title">Melhores Ofertas</h1>

        <section className="main--offers">
          {products.map(({ id, name, price, image, tags }) => (
            <div key={id} className="product--card">
              <div className="product--card--image">
                <Link href={`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`}>
                  <img src={image} alt="" />
                </Link>
              </div>

              <div className="product--card--desc">
                <h2 className="product--card--title">{name}</h2>
                {tags.slice(0, 3).map((tag) => (
                  <Link key={tag} href={`/tags/${tag.replace(' ', '-')}`} className="product--category">
                    {tag}
                  </Link>
                ))}
                <p className="product--card--paragraph">R$ {price.toFixed(2)}</p>

                <div className="product--card--button--wrapper">
                  <button onClick={() => navigate(`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`)} className="product--card--buy">
                    <img src={receipt} alt="" className="product--card--label" />
                    Comprar
                  </button>

                  <button onClick={() => handleAddProductToCart(id)} className="product--card--cart">
                    <img src={shoppingCart} alt="" className="product--card--label" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {categoriesThatHaveProducts?.map(({ id, name }) => (
          <React.Fragment key={id}>
            <h1 className="main--title">{name}</h1>

            <section className="main--offers">
              {products
                .filter((product) => product.tags.includes(name.toLowerCase()))
                .map(({ id, name, price, image, tags }) => (
                  <div key={id} className="product--card">
                    <div className="product--card--image">
                      <Link href={`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`}>
                        <img src={image} alt="" />
                      </Link>
                    </div>

                    <div className="product--card--desc">
                      <h2 className="product--card--title">{name}</h2>
                      {tags.slice(0, 3).map((tag) => (
                        <Link key={tag} href={`/tags/${tag.replace(' ', '-')}`} className="product--category">
                          {tag}
                        </Link>
                      ))}
                      <p className="product--card--paragraph">R$ {price.toFixed(2)}</p>

                      <div className="product--card--button--wrapper">
                        <button onClick={() => navigate(`/products/${name.toLowerCase().split(', ').join('-').split(' ').join('-')}`)} className="product--card--buy">
                          <img src={receipt} alt="" className="product--card--label" />
                          Comprar
                        </button>

                        <button onClick={() => handleAddProductToCart(id)} className="product--card--cart">
                          <img src={shoppingCart} alt="" className="product--card--label" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </section>
          </React.Fragment>
        ))}
      </main>
    </React.Fragment>
  );
}

export default memo(Home);
