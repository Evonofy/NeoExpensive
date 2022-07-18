import { Routes, Route } from 'react-router-dom';

import Home from './pages/index';
import About from './pages/about';
import Checkout from './pages/checkout';

export const Pages = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};
