import { Routes, Route } from 'react-router-dom';

import Home from './pages/index';
import About from './pages/about';
import Checkout from './pages/checkout';
import Status from './pages/status';

export const Pages = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/status" element={<Status />} />
    </Routes>
  );
};
