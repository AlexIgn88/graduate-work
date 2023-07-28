import { SWRConfig } from 'swr';
import GetData from '../../components/GetData';
import AllTopicsComponent from '../../components/forum/AllTopicsComponent';
import Head from "next/head";
import { useSession } from 'next-auth/react';
import { fictionalDataForForum } from '../../data/fictionalData'

export async function getStaticProps() {
    return {
        props: {
            fallback: {
                '/api/forum/topic/': fictionalDataForForum
            }
        }
    };
}

export default function ForumPage({ fallback }) {

    const API_URL = '/api/forum/topic/',
        { data: session } = useSession();

    return <>
        <Head>
            <title>Форум</title>
        </Head>
        <div className="page forum-page">
            <div>Добро пожаловать на наш форум, {session?.user ? session?.user?.name : 'Гость'}!</div>
            <h1>Форум</h1>

            <SWRConfig value={{ fallback }}>
                <GetData url={API_URL}>
                    <AllTopicsComponent />
                </GetData>
            </SWRConfig>

            <div className="additional-information">
                <h2>Дополнительная информация</h2>
                <div className="additional-information-div">
                    <div>Посетители: 2</div>
                    <div>
                        <span>Статистика форума:</span>
                        <div>
                            создано тем: 3, в которые добавлено 0 ответов, зарегистрировано участников: 2.
                            Приветствуем нового участника: Василий Теркин.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>;
}