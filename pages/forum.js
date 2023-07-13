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
        <div className="page forum-page">
            <h1>Форум</h1>
            <div className="topics">
                <h1>Темы</h1>
                <div className="topics-div">
                    {topics.map((topic) => (
                        <div key={topic.id}>
                            <h3>{topic.title}</h3>
                            <p>Автор: {topic.author}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="additional-information">
                <h2>Дополнительная информация</h2>
                <div className="additional-information-div">
                    <div>Посетители: 2</div>
                    <div>
                        Статистика форума: создано 3 темы, в которые добавлено 0 ответов зарегистрировано 2 участника.
                        Приветствуем нового участника Имярек
                    </div>
                </div>
            </div>
        </div>
    </>
}