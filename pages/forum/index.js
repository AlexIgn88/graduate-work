import Head from "next/head";

import { useStore } from '@nanostores/react';
import getStores from '../../store/generateStores';
// import columns from '../includes/columns'
// import EditableComponent from '../components/EditableComponent';
import Link from "next/link";

import { useSession } from 'next-auth/react';

const
    topicsStores = getStores('/api/public/topic/');

export default function ForumPage() {

    const
        { fetcherStore, addStore, delStore, updateStore } = topicsStores,
        { data, loading, error } = useStore(fetcherStore),
        { mutate: onAdd } = useStore(addStore),
        { mutate: onDelete } = useStore(delStore),
        { mutate: onEdit } = useStore(updateStore),

        { data: session } = useSession();

    // console.log('data=', data);

    // if (error) return <>Error={error}</>;
    // if (data) return

    // <EditableComponent
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
            <div>Добро пожаловать на наш форум, {session?.user?.name}!</div>
            <h1>Форум</h1>
            <div className="topics">
                <h2>Темы для обсуждения</h2>
                {error && <>Error={error}</>}
                {Array.isArray(data) && <div className="topics-div">
                    {data.map((topic) => (
                        <div className="topic" key={topic.id}>
                            <h3>ID: {topic.id}</h3>
                            <div className="topic-title">
                                <Link href={`/forum/topic/${topic.id}+${topic.title}`} className=""><h3>{topic.title}</h3></Link>
                            </div>
                            <div>Описание: {topic.content}</div>
                            <div>{topic.createdAt}</div>
                            <div>{topic.updatedAt}</div>
                            {/* <div>{topic.userId}</div> */}
                            <p>Автор: {topic.userName}</p>
                        </div>
                    ))}
                </div>}
                {loading && <div className='spinner'>СПИНЕР ОТКЛЮЧЕН В CSS</div>}
            </div>



            <div className="additional-information">
                <h2>Дополнительная информация</h2>
                <div className="additional-information-div">
                    <div>Посетители: 2</div>
                    <div>
                        <span>Статистика форума:</span>
                        <div>
                            создано тем: {data?.length}, в которые добавлено 0 ответов, зарегистрировано участников: 2.
                            Приветствуем нового участника: Хомячок
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>Это - из базы:
                {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
            </div> */}




        </div>
    </>
}