import "../styles/global.css";
import { Global } from '@emotion/react';
import { globalStyles } from '../displayParameters/globalStyles';
import Head from 'next/head';
import Layout from '../components/Layout.js';
// import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';

// import { extendTheme } from '@chakra-ui/react'



export default function MyApp({ Component,
  pageProps: { session, ...pageProps }
}) {

  return <>
    <Head>
      {/* <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta keywords="travel agency"></meta>
      <meta name="yandex-verification" content="cf876422267292e9" />
      <link rel="icon" href="/img/favicon.png" />
    </Head>
    <SessionProvider session={session}>
      {/* <ChakraProvider theme={theme}> */}
        <ChakraProvider>
        <Global styles={globalStyles} />
        <Layout>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  </>
}