import Head from "next/head";
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function MainContainer({ keywords, title, children }) {
    return (
        <>
            <Head>
                {/* <meta keywords={"travel agency" + keywords}></meta> */}
                <meta keywords={"travel agency"}></meta>
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