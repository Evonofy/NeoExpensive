import { FC } from "react";

import { Link } from "./Link";

type SeoProps = {
  theme: "light" | "dark";
  title: string;
  description: string;
};

export const Seo: FC<SeoProps> = ({ theme, title, description }) => {
  return (
    <>
      <Link rel="icon" theme={theme} href="logo_512.svg" />
      <Link rel="shortcut icon" theme={theme} href="logo_512.svg" />

      {/* MANIFEST JSON */}
      <Link rel="manifest" theme={theme} href="manifest.json" />

      <meta name="theme-color" content="#ACAFB9" />

      <meta name="application-name" content={title} />
      <meta name="description" content={description} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      <Link
        rel="apple-touch-icon"
        theme={theme}
        href="/apple/apple_touch_180.svg"
      />

      <Link
        rel="apple-touch-icon"
        theme={theme}
        sizes="152x152"
        href="/apple/apple_touch_152.svg"
      />

      <Link
        rel="apple-touch-icon"
        theme={theme}
        sizes="152x152"
        href="/apple/apple_touch_152.svg"
      />

      <Link
        rel="apple-touch-icon"
        theme={theme}
        sizes="180x180"
        href="/apple/apple_touch_180.svg"
      />

      <Link
        rel="apple-touch-icon"
        theme={theme}
        sizes="167x167"
        href="/apple/apple_touch_167.png"
      />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/dark/logo_512.svg" />
      <meta name="twitter:creator" content="@VitorGouveia" />

      {/* OPEN GRAPH */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      />

      {/* <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_2048.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1668.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1536.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1125.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1242.png"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_750.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_640.png"
        sizes="640x1136"
      /> */}
    </>
  );
};
