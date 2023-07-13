import Head from "next/head";

export default function ForumPage() {

    const topics = [
        { id: 1, title: 'Тема 1', author: 'Автор 1' },
        { id: 2, title: 'Тема 2', author: 'Автор 2' },
        { id: 3, title: 'Тема 3', author: 'Автор 3' },
    ];

    return <>
        <Head>
            <title>Форум</title>
        </Head>
        <div className="forum-page">
            <h1>Форум</h1>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        <h2>{topic.title}</h2>
                        <p>Автор: {topic.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
}