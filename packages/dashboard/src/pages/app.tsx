import { FC } from "react";
import { AppProps, NextWebVitalsMetric } from "next/app";

// export const reportWebVitals = (metric: NextWebVitalsMetric) => {
//   console.log(metric);
// };
import "../styles/global.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
