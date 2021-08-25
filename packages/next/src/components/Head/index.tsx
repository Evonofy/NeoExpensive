import { default as PageHead } from 'next/head';

export const Head = () => {
  return (
    <PageHead>
      {/* Gives parameters to all information to data that must be applied */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="
          width=device-width,
          initial-scale=1.0,
          maximum-scale=3.0,
          minimum-scale=0.5,
          user-scalable=yes
        "
      />

      <meta
        name="author"
        content="Vitor Neves, Vinicius Oliveira e Thiago Lisboa"
      />
      <meta name="description" content="NeoExpensive E-Commerce Website" />

      <meta name="msapplication-config" content="/browserconfig.xml" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500&family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />

      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="white"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="black"
      />

      <meta name="application-name" content="Neo Expensive" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Neo Expensive" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#9f00a7" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#8B46A3" />

      <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon152.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon167.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/icons180.png" />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Google configuration */}
      <meta itemProp="name" content="NeoExpensive" />
      <meta itemProp="description" content="NeoExpensive E-Commerce Website" />
      <meta itemProp="image" content="/icons/pwa-512x512.png" />

      {/* Twitter configuration */}
      <meta name="twitter:card" content="Home" />
      <meta
        name="twitter:url"
        content="https://esquemaflorescer.github.io/neo-expensive/packages/web/"
      />
      <meta name="twitter:title" content="NeoExpensive" />
      <meta
        name="twitter:description"
        content="NeoExpensive E-Commerce Website"
      />
      <meta name="twitter:image" content="/icons/pwa-192x192.png" />
      <meta name="twitter:creator" content="@VitorAvalanche" />

      {/* Facebook configuration */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="NeoExpensive" />
      <meta
        property="og:description"
        content="NeoExpensive E-Commerce Website"
      />
      <meta property="og:site_name" content="NeoExpensive" />
      <meta
        property="og:url"
        content="https://esquemaflorescer.github.io/neo-expensive/packages/web/"
      />
      <meta property="og:image" content="/icons/apple-touch-icon-180x180.png" />

      {/* Apple Splash Screen configuration */}
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash2048-2732.jpg"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash1668-2224.jpg"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash1536-2048.jpg"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash1125-2436.jpg"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash1242-2208.jpg"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash750-1334.jpg"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/icons/splash640-1136.jpg"
        sizes="640x1136"
      />

      <title>Neo Expensive</title>
    </PageHead>
  );
};
