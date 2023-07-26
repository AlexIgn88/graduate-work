import Head from 'next/head';
import Layout from '../components/Layout.js';
import "../styles/global.css";
import { Toaster } from 'react-hot-toast';
// import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { Global } from '@emotion/react';

// import { extendTheme } from '@chakra-ui/react'

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// export const theme = extendTheme({ colors })

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

      <ChakraProvider>
        {/* <ChakraProvider theme={theme}> */}

        {/* <CSSReset /> */}
        <Global
          styles={{
            body: {
              height: '100%',
              backgroundColor: '#f8e183',
              fontFamily: 'sans-serif'
            }
          }}
        />

        <Layout>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </Layout>
      </ChakraProvider>

    </SessionProvider>
  </>
}