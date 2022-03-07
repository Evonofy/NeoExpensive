import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';

import { Product as IProduct } from '@src/types/products';
import { ProductsContext } from '@context/products';

import { Button } from '@components/Button';

export default function Product() {
  const products = useContextSelector(ProductsContext, (context) => context.products);

  const navigate = useNavigate();
  const params = useParams() as {
    slug: string;
  };

  const product = useMemo(() => {
    return products.find((product) => product.name.toLowerCase().split(', ').join('-').split(' ').join('-') === params.slug);
  }, [params.slug, products]);

  const relatedProducts = useMemo(() => {
    const relatedPosts: IProduct[] = [];

    product?.tags.forEach((tag) => {
      products.forEach(({ tags, ...rest }) => {
        if (tags.includes(tag)) {
          relatedPosts.push({
            tags,
            ...rest,
          });
        }
      });
    });

    return relatedPosts.slice(0, 3);
  }, [product?.tags, products]);

  return (
    <div>
      <aside>
        <div>
          <p>{product?.name}</p>
        </div>
        <div>
          <p>{product?.rating}</p>
        </div>

        <div>
          <p>from {product?.price}</p>
          <p>{product?.price! - product?.price! * 0.1}</p>
          <p>a vista com 10% de desconto </p>
        </div>
        <div>
          <p>{product?.price}</p>
          <p>12x de {((product?.price! - product?.price! * 0.1) / 12).toFixed(2)} s/juros no cartao</p>
        </div>
        <div>
          <p>frete gratis</p>
        </div>

        <div>
          <Button onClick={() => navigate(`/checkout/${product?.id}`)}>buy</Button>
          <Button onClick={() => navigate('/cart')}>cart</Button>
        </div>
      </aside>

      <ul>
        {relatedProducts.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

      <div>{product?.description}</div>

      <ul>
        {relatedProducts.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
