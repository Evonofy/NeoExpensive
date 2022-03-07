import { memo, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@pages/home'));
const Login = lazy(() => import('@pages/auth/login'));
const Register = lazy(() => import('@pages/auth/register'));
const ForgotPassword = lazy(() => import('@pages/auth/forgot-password'));
const RedeemPassword = lazy(() => import('@pages/auth/redeem-password'));
const Profile = lazy(() => import('@pages/auth/profile'));

const Product = lazy(() => import('@pages/product'));

const Cart = lazy(() => import('@pages/cart'));

const Checkout = lazy(() => import('@pages/checkout'));
const CheckoutProduct = lazy(() => import('@pages/checkout-product'));
const CheckoutSuccess = lazy(() => import('@pages/checkout-success'));

const EmailCode = lazy(() => import('@pages/email/email-code'));
const EmailConfirmation = lazy(() => import('@pages/email/email-confirmation'));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/redeem" element={<RedeemPassword />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:slug" element={<Product />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/:id" element={<CheckoutProduct />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />

        <Route path="/email/code" element={<EmailCode />} />
        <Route path="/email/confirmation" element={<EmailConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(Router);
