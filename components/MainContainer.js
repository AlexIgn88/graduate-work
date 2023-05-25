import Head from "next/head";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function MainContainer({ keywords, title, children }) {
    return (
        <>
            <Head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                {/* <meta keywords={"travel agency" + keywords}></meta> */}
                <meta keywords={"travel agency"}></meta>
                <link rel="icon" href="/img/favicon.png" />
                <title>{title}</title>
            </Head>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};