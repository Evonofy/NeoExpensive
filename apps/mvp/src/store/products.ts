import create from 'zustand';

import { Product } from '@src/types/products';

type useProductsStoreProps = {
  products: Product[];
  setProducts(products: Product[]): void;
};

export const useProductsStore = create<useProductsStoreProps>((set) => ({
  products: [
    {
      id: '1',
      name: 'Teclado Mecanico Redragon RGB',
      description: 'Teclado Mecanico Redragon RGB',
      price: 239.9,
      rating: 2.83,
      tags: ['redragon', 'rgb', 'teclado', 'teclado mecanico'],
      brands: ['redragon'],
    },
    {
      id: '2',
      name: 'Headset Gamer Logitech G435 Wireless',
      description: 'Headset Gamer Logitech G435 Wireless',
      price: 534.0,
      rating: 4.96,
      tags: ['headset', 'headset gamer', 'logitech', 'g435', 'headset wireless', 'headset gamer wireless'],
      brands: ['logitech'],
    },
    {
      id: '3',
      name: 'Teclado Mecanico Virgo RGB Switch Gateron Vermelho',
      description: 'Teclado Mecanico Virgo RGB Switch Gateron Vermelho',
      price: 359.9,
      rating: 3.92,
      tags: ['teclado', 'rgb', 'teclado mecanico', 'switch vermelho'],
      brands: ['pichau'],
    },
    {
      id: '4',
      name: 'Headset Gamer Pichau P852 Vega, RGB, Som Surround 7.1, Drivers 53mm, Preto, PGH-P852VGA-RGB',
      description: 'Headset Gamer Pichau P852 Vega, RGB, Som Surround 7.1, Drivers 53mm, Preto, PGH-P852VGA-RGB',
      price: 489.9,
      rating: 2.18,
      tags: ['headset', 'headset gamer', 'pichau', 'rgb', 'preto'],
      brands: ['pichau'],
    },
    {
      id: '5',
      name: 'Headset Gamer Pichau P852 Atria, Drivers 53mm, Preto, PGH-P852ATR-BLK',
      description: 'Headset Gamer Pichau P852 Atria, Drivers 53mm, Preto, PGH-P852ATR-BLK',
      price: 389.9,
      rating: 4.64,
      tags: ['headset', 'headset gamer', 'preto'],
      brands: ['pichau'],
    },
    {
      id: '6',
      name: 'Mouse Gamer Pichau Hive S, RGB, 16000DPI, 6 Botoes. Preto, PGM-HVSRGB-BLK',
      description: 'Mouse Gamer Pichau Hive S, RGB, 16000DPI, 6 Botoes. Preto, PGM-HVSRGB-BLK',
      price: 219.9,
      rating: 1.12,
      tags: ['mouse', 'mouse gamer', 'preto', 'rgb'],
      brands: ['pichau'],
    },
    {
      id: '7',
      name: 'Cadeira Gamer Pichau Taurus, Preta e Vermelha, PG-TAU-RED01',
      description: 'Cadeira Gamer Pichau Taurus, Preta e Vermelha, PG-TAU-RED01',
      price: 1199.9,
      rating: 3.3,
      tags: ['cadeira', 'cadeira gamer', 'preto', 'vermelho'],
      brands: ['pichau'],
    },
  ],
  setProducts(products) {
    set(() => ({
      products,
    }));
  },
}));
