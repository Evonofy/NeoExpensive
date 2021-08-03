import { default as PageHead } from "next/head"

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

    <meta name="author" content="Vitor Neves, Vinicius Oliveira e Thiago Lisboa" />
    <meta name="description" content="NeoExpensive E-Commerce Website" />
    
    {/* Favicon, stylesheet links and script link to HTML */}
    <link rel="icon" href="/icon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    
    <link rel="icon" type="image/png" href="/icons/favicon-16x16.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/icons/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/icons/android-192x192.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" sizes="180x180" />
    <meta name="msapplication-config" content="/browserconfig.xml" />

    {/* <meta name="theme-color" media="(prefers-color-scheme: light)" content="white" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)"  content="black" /> */}
    
    <title>Neo Expensive</title>
  </PageHead>
)
}