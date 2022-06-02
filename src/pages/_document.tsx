import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
      </Head>
      <body className="bg-black bg-background bg-top bg-[length:auto_100vh] md:bg-cover bg-no-repeat">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}