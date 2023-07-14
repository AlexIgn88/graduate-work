import Head from "next/head";

import { useStore } from '@nanostores/react';
import getStores from '../../store/generateStores';
// import columns from '../includes/columns'
// import EditableComponent from '../components/EditableComponent';
import Link from "next/link";

const
    usersStores = getStores('/api/public/topic/');

export default function ForumPage() {

    //временное
    const topics = [
        // { id: 1, title: 'Тема 1', author: 'Автор 1' },
        // { id: 2, title: 'Тема 2', author: 'Автор 2' },
        // { id: 3, title: 'Тема 3', author: 'Автор 3' },
        {
            id: 1,
            title: "Привет всем!",
            content: "тестовая тема",
            createdAt: "2023-07-14T11:55:56.228Z",
            updatedAt: "2023-07-14T14:55:49.000Z",
            userId: "cljsyvtqm0002l5086h5ivxxl"
        },
        {
            id: 2,
            title: "Пока всем!",
            content: "тест",
            createdAt: "2023-07-14T11:56:33.163Z",
            updatedAt: "2023-07-14T14:56:29.000Z",
            userId: "cljsyvtqm0002l5086h5ivxxl"
        }
    ];

    const
        { fetcherStore, addStore, delStore, updateStore } = usersStores,
        { data, loading, error } = useStore(fetcherStore),
        { mutate: onAdd } = useStore(addStore),
        { mutate: onDelete } = useStore(delStore),
        { mutate: onEdit } = useStore(updateStore);

    // console.log('data=', data);

    // if (error) return <>Error={error}</>;
    // if (data) return <EditableComponent
    //   columns={columns}
    //   data={data}
    //   onAdd={onAdd}
    //   onDelete={onDelete}
    //   onEdit={onEdit}
    // />;
    // if (loading) return <div className='spinner'></div>;

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
                            <h3>ID: {topic.id}</h3>
                            {/* <h3>title: {topic.title}</h3> */}

                            <Link href={`/forum/topic/${topic.id}`} className=""><h3>title: {topic.title}</h3></Link>

                            {/* <div>{topic.content}</div> */}
                            <div>{topic.createdAt}</div>
                            <div>{topic.updatedAt}</div>
                            {/* <div>{topic.userId}</div> */}
                            {/* <p>Автор: {topic.author}</p> */}
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
            {/* <Link href={`/forum/topic/1`} className="one-card">страничка</Link> */}
            <div>Это - из базы:
                {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
            </div>




        </div>
    </>
}