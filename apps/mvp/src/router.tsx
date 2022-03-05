import { memo, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@pages/home'));
const Login = lazy(() => import('@pages/auth/login'));
const Register = lazy(() => import('@pages/auth/register'));
const ForgotPassword = lazy(() => import('@pages/auth/forgot-password'));
const RedeemPassword = lazy(() => import('@pages/auth/redeem-password'));

const EmailCode = lazy(() => import('@pages/email/email-code'));
const EmailConfirmation = lazy(() => import('@pages/email/email-confirmation'));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/redeem" element={<RedeemPassword />} />

        <Route path="/email/code" element={<EmailCode />} />
        <Route path="/email/confirmation" element={<EmailConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(Router);
