import Head from "next/head";
import Link from "next/link";

export default function BlogPage() {
    let articles = [
        { id: '1', name: 'История Генуэзской крепости в Крыму', path: 'genoese-fortress', img: '/img/BlogPage/Genoese fortress.jpg' },
        { id: '2', name: 'Тестовая карточка', path: 'test', img: null }
    ];

    return <>
        <Head>
            <title>Блог</title>
        </Head>
        <div>
            <h1>Блог</h1>
            <ol className="cards">
                {articles.map(article => (
                    <li key={article.id}>
                        <Link href={`/blog/${article.path}`} className="one-card">
                            {article.name}
                            <img className="card-img" src={article.img ? article.img : "/img/favicon.png"} alt={article.name}></img>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    </>
}

{/* <li key={place.id} >
    <Link href={`/places/${place.path}`} className="one-place">
        {place.name}
        <img className="card-img" src={place.img ? place.img : "/img/favicon.png"} alt={place.name}></img>
    </Link>
</li> */}