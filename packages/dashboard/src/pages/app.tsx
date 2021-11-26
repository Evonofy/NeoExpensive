import { FC } from "react";
import { AppProps, NextWebVitalsMetric } from "next/app";

import { Layout } from "@components";

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  console.log(metric);
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
