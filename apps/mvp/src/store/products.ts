import create from 'zustand';

import { Product } from '@src/types/products';
import { Category } from '@src/types/categories';

type useProductsStoreProps = {
  products: Product[];
  categories: Category[];
  setProducts(products: Product[]): void;
};

export const useProductsStore = create<useProductsStoreProps>((set) => ({
  categories: [
    {
      id: '1',
      name: 'Hardware',
    },
    {
      id: '5',
      name: 'Gamer',
    },
    {
      id: '2',
      name: 'Periféricos',
    },
    {
      id: '3',
      name: 'Consoles',
    },
    {
      id: '4',
      name: 'Acessórios',
    },
  ],
  products: [
    {
      id: '1',
      name: 'Teclado Mecanico Redragon RGB',
      image: 'https://m.media-amazon.com/images/I/71zNBLpvw2L._AC_SY450_.jpg',
      description: 'Teclado Mecanico Redragon RGB',
      price: 239.9,
      rating: 2.83,
      tags: ['redragon', 'rgb', 'teclado', 'teclado mecanico', 'periféricos'],
      brands: ['redragon'],
    },
    {
      id: '2',
      name: 'Headset Gamer Logitech G435 Wireless',
      image: 'https://images.kabum.com.br/produtos/fotos/263077/headset-gamer-sem-fio-logitech-g435-lightspeed-e-bluetooth-dolby-atmos-usb-pc-ps4-ps5-mobile-drivers-40mm-preto-981-001049_1636554612_g.jpg',
      description: 'Headset Gamer Logitech G435 Wireless',
      price: 534.0,
      rating: 4.96,
      tags: ['headset', 'headset gamer', 'logitech', 'g435', 'headset wireless', 'headset gamer wireless', 'acessórios'],
      brands: ['logitech'],
    },
    {
      id: '3',
      name: 'Teclado Mecanico Virgo RGB Switch Gateron Vermelho',
      image: 'https://m.media-amazon.com/images/I/51djCzPsC2L._AC_.jpg',
      description: 'Teclado Mecanico Virgo RGB Switch Gateron Vermelho',
      price: 359.9,
      rating: 3.92,
      tags: ['teclado', 'rgb', 'teclado mecanico', 'switch vermelho', 'periféricos'],
      brands: ['pichau'],
    },
    {
      id: '4',
      name: 'Headset Gamer Pichau P852 Vega, RGB, Som Surround 7.1, Drivers 53mm, Preto, PGH-P852VGA-RGB',
      image: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/g/pgh-p852vga-rgb2.jpg',
      description: 'Headset Gamer Pichau P852 Vega, RGB, Som Surround 7.1, Drivers 53mm, Preto, PGH-P852VGA-RGB',
      price: 489.9,
      rating: 2.18,
      tags: ['headset', 'headset gamer', 'pichau', 'rgb', 'preto', 'acessórios'],
      brands: ['pichau'],
    },
    {
      id: '5',
      name: 'Headset Gamer Pichau P852 Atria, Drivers 53mm, Preto, PGH-P852ATR-BLK',
      image: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/g/pgh-p852atr-blk2.jpg',
      description: 'Headset Gamer Pichau P852 Atria, Drivers 53mm, Preto, PGH-P852ATR-BLK',
      price: 389.9,
      rating: 4.64,
      tags: ['headset', 'headset gamer', 'preto', 'acessórios'],
      brands: ['pichau'],
    },
    {
      id: '6',
      name: 'Mouse Gamer Pichau Hive S, RGB, 16000DPI, 6 Botoes. Preto, PGM-HVSRGB-BLK',
      image: 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/g/pgm-hvsrgb-blk12313.jpg',
      description: 'Mouse Gamer Pichau Hive S, RGB, 16000DPI, 6 Botoes. Preto, PGM-HVSRGB-BLK',
      price: 219.9,
      rating: 1.12,
      tags: ['mouse', 'mouse gamer', 'preto', 'rgb', 'periféricos'],
      brands: ['pichau'],
    },
    {
      id: '7',
      name: 'Cadeira Gamer Pichau Taurus, Preta e Vermelha, PG-TAU-RED01',
      image: 'https://hotsite.pichau.com.br/descricao/PichauGaming/PG-TAU-RED01/PG-TAU-RED012.png',
      description: 'Cadeira Gamer Pichau Taurus, Preta e Vermelha, PG-TAU-RED01',
      price: 1199.9,
      rating: 3.3,
      tags: ['cadeira', 'cadeira gamer', 'preto', 'vermelho', 'acessórios'],
      brands: ['pichau'],
    },
  ],
  setProducts(products) {
    set(() => ({
      products,
    }));
  },
}));
