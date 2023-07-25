import Head from 'next/head';
import Layout from '../components/Layout.js';
import "../styles/global.css";
import { Toaster } from 'react-hot-toast';
// import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component,
  pageProps: { session, ...pageProps }
}) {

  return <>
    <Head>
      {/* <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta keywords="travel agency"></meta>
      <link rel="icon" href="/img/favicon.png" />
    </Head>
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </Layout>
    </SessionProvider>
  </>
}