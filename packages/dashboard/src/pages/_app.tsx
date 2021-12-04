import { FC } from "react";
import { AppProps, NextWebVitalsMetric } from "next/app";

import "@neo/wunderlust/dist/main.css";

export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  console.log(metric);
};

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
