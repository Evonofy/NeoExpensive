import type { NextPage } from 'next';
import Error from 'next/error';

const ErrorPage: NextPage = () => {
  return <Error statusCode={404} />;
};

export default ErrorPage;
