import Head from "next/head";
import { useRouter } from 'next/router'

import { useStore } from '@nanostores/react';
import getStores from '../../../store/generateStores';
// import columns from '../includes/columns'
// import EditableComponent from '../components/EditableComponent';

const
    usersStores = getStores('/api/public/post/');

export default function TopicPage() {
    const { query } = useRouter();

    console.log('useRouter()=', useRouter());
    console.log('query=', query);

    const
        { fetcherStore, addStore, delStore, updateStore } = usersStores,
        { data, loading, error } = useStore(fetcherStore),
        { mutate: onAdd } = useStore(addStore),
        { mutate: onDelete } = useStore(delStore),
        { mutate: onEdit } = useStore(updateStore);

    return (<>
        <Head>
            <title>Тема</title>
        </Head>
        <div className="page topic-page">
            <h1>Тема c path {query.path}</h1>

            <div>Это - из базы:
                {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
            </div>


        </div>
    </>
    )
};