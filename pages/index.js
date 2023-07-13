import Head from "next/head";

export default function HomePage() {
    return <>
        <Head>
            <title>Туристическое агентство "Исторические маршруты и заповедные места"</title>
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