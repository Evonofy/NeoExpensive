import Document, { Head, Html, Main, NextScript } from "next/document";

import { Link } from "@components";

class AppDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Link rel="icon" theme="dark" href="logo_512.svg" />
          <Link rel="shortcut icon" theme="dark" href="logo_512.svg" />

          <Link rel="icon" theme="light" href="logo_512.svg" />
          <Link rel="shortcut icon" theme="light" href="logo_512.svg" />

          {/* MANIFEST JSON */}
          <Link rel="manifest" theme="dark" href="manifest.json" />
          <Link rel="manifest" theme="light" href="manifest.json" />

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
