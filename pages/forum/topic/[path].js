import Head from "next/head";
import { useRouter } from 'next/router'

import { useStore } from '@nanostores/react';
import getStores from '../../../store/generateStores';
// import columns from '../includes/columns'
// import EditableComponent from '../components/EditableComponent';

const
    postsStores = getStores('/api/public/post/');

export default function TopicPage() {
    const { query } = useRouter();

    // console.log('useRouter()=', useRouter());
    // console.log('query=', query);

    // console.log('query=', query);

    const topicId = +query?.path?.split('+')[0] || 'ID',
        topicTitle = query?.path?.split('+')[1] || 'Title';

    // console.log('query.path=', query.path);
    console.log('+query.path=', +query?.path?.split('+')[0]);
    console.log('topicId', topicId);

    const
        { fetcherStore, addStore, delStore, updateStore } = postsStores,
        { data, loading, error } = useStore(fetcherStore),
        { mutate: onAdd } = useStore(addStore),
        { mutate: onDelete } = useStore(delStore),
        { mutate: onEdit } = useStore(updateStore);

    let posts;
    Array.isArray(data) ? posts = data : posts = [];
    posts = posts.filter(obj => obj.topicId === topicId);

    // console.log('posts=', posts);

    return (<>
        <Head>
            <title>Тема</title>
        </Head>
        <div className="page topic-page">
            <h1>Тема '{topicTitle}' c номером '{topicId}'</h1>
            {error && <>Error={error}</>}
            {Array.isArray(posts) && posts.map((post) => (
                <div className="post" key={post.id}>
                    {/* <div>номер поста: {post.id}</div> */}
                    <div>содержимое: {post.content}</div>
                    <div>время создания: {post.createdAt}</div>
                    <div>время обновления: {post.updatedAt}</div>
                    {/* <div>User ID: {post.userId}</div> */}
                    <div>Автор: {post.userName}</div>
                    <div>topicId: {post.topicId}</div>
                </div>
            ))}

            {/* <div>Это - из базы:
                {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
            </div> */}


        </div>
    </>
    )
};