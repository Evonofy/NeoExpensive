import Document, { Head, Html, Main, NextScript } from "next/document";

import { Seo } from "@components";

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Seo
            title="Neo Expensive"
            description="The Neo Expensive Dashboard Admin System that powers the Neo Expensive E-commerce."
            theme="dark"
          />
          <Seo
            title="Neo Expensive"
            description="The Neo Expensive Dashboard Admin System that powers the Neo Expensive E-commerce."
            theme="light"
          />

          {/* GOOGLE FONTS PRECONNECT */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          {/* Roboto */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />

          <NextScript />
        </Head>

        <body>
          <Main />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
