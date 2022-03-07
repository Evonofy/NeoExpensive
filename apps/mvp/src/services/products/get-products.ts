import { v4 as uuid } from 'uuid';

import { Product } from '@src/types/products';

type getProductsResponse = {
  products: Product[];
};

export async function getProductsRequest(): Promise<getProductsResponse> {
  try {
    const products: Product[] = [
      {
        id: uuid(),
        name: 'Teclado Mecanico Redragon Fizz, RGB, ABNT2, Compacto, Switch Azul, Branco, K617-RGB-W',
        price: 239.9,
        rating: 2.83,
      },
      {
        id: uuid(),
        name: 'Headset Gamer Logitech G435, Wireless, Drivers 40mm, Azul, 981-001061',
        price: 534.0,
        rating: 4.96,
      },
      {
        id: uuid(),
        name: 'Teclado Mecanico Pichau Virgo RGB, ANSI, Switch Gateron Vermelho, Preto, PGK-VRG-BL01',
        price: 359.9,
        rating: 3.92,
      },
      {
        id: uuid(),
        name: 'Headset Gamer Pichau P852 Vega, RGB, Som Surround 7.1, Drivers 53mm, Preto, PGH-P852VGA-RGB',
        price: 489.9,
        rating: 2.18,
      },
      {
        id: uuid(),
        name: 'Headset Gamer Pichau P852 Atria, Drivers 53mm, Preto, PGH-P852ATR-BLK',
        price: 389.9,
        rating: 4.64,
      },
      {
        id: uuid(),
        name: 'Mouse Gamer Pichau Hive S, RGB, 16000DPI, 6 Botoes. Preto, PGM-HVSRGB-BLK',
        price: 219.9,
        rating: 1.12,
      },
      {
        id: uuid(),
        name: 'Cadeira Gamer Pichau Taurus, Preta e Vermelha, PG-TAU-RED01',
        price: 1199.9,
        rating: 3.3,
      },
    ];

    if (!products) {
      return { products: [] };
    }

    return {
      products,
    };
  } catch (error) {
    // handle errors
    return { products: [] };
  }
}
