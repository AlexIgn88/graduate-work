import Head from "next/head";

export default function ErrorPage() {
    return <>
        <Head>
            <title>Страница не найдена</title>
        </Head>
        <div className="page error-page">
            <h1>Страница не найдена</h1>
        </div>
    </>
}