import { AppProps } from "next/app"

import { Head } from "../components/Head"

const app = ({ Component, pageProps }: AppProps) => {
  return (
  <>
    <Head />
    <Component {...pageProps} />
  </>
)
}

export default app