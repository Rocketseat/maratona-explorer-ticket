import Head from 'next/head';
import '../styles/global.css';

function MyApp({ 
  Component, 
  pageProps,
}) {
  return (
    <>
      <Head>
        <title>Ticket da Maratona Explore</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
