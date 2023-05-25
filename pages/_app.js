import Head from "next/head";
import Layout from '../components/Layout.js';
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta keywords="travel agency"></meta>
      <link rel="icon" href="/img/favicon.png" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}