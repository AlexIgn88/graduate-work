import Head from "next/head";

export default function HomePage() {
    return <>
        <Head>
            <title>Туристическое агентство &quot;Исторические маршруты и заповедные места&quot;</title>
        </Head>
        <div className="home-page">
            <div>
                <div className="home-page-title">
                    <div>ИСТОРИЧЕСКИЕ МАРШРУТЫ</div>
                    <div>ЗАПОВЕДНЫЕ МЕСТА</div>
                </div>
            </div>
        </div>
    </>
}