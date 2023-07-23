import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from "next/head";

export default function TopicComponent({ data, mutate, topicId }) {

    const
        [newPostInputVal, setNewPostInputVal] = useState(''),
        [editPostId, setEditPostId] = useState(null),
        [currentPostInputVal, setCurrentPostInputVal] = useState(''),

        newPost = {},

        sessionHookResult = useSession(),
        { data: session } = useSession();

    // const {
    //     name: currentUserName,
    //     email: currentUserEmail,
    //     image: currentUserImage,
    //     id: currentUserId,
    //     role: currentUserRole
    // } = sessionHookResult?.data?.user;

    const
        currentUserId = sessionHookResult?.data?.user?.id,
        currentUserName = sessionHookResult?.data?.user?.name,
        currentUserRole = sessionHookResult?.data?.user?.role;

    // console.log('data=', data);

    console.log('topicId=', topicId);

    return <div className="page topic-page">
        <Head>
            <title>{data.topic.title}</title>
        </Head>
        <div className="post-div">
            <h1>{data.topic.title}</h1>

            {session && <div>
                <input
                    type='search'
                    name='new-post'
                    placeholder={'пост'}
                    value={newPostInputVal}
                    onInput={evt => setNewPostInputVal(evt.target.value)}
                />
                <button type='submit' onClick={async () => {
                    async function addPost(formData) {
                        try {
                            const response = await fetch('/api/forum/post/', {
                                method: 'POST',
                                body: JSON.stringify(formData)
                            });
                            console.log('adduser response', response);
                            if (!response.ok) throw new Error('не ок');
                            const json = await response.json();
                            console.log('json', json);
                            return {
                                ...data, posts: [...data.posts, json]
                            }
                        } catch (error) {
                            null;
                        }
                    }
                    try {
                        const formData = {
                            content: newPostInputVal,
                            createdAt: null, //временная затычка
                            updatedAt: null, //временная затычка
                            userId: currentUserId,
                            topicId: +topicId
                        };
                        mutate(addPost(formData));
                        setNewPostInputVal('');
                    } catch (error) {
                        null;
                    } finally {
                        null;
                    }
                }
                }>Добавить пост</button>
            </div>}

            {data?.posts?.map((post) => (

                <div className="post" key={post.id}>
                    <h3>ID поста для отладки: {post.id}</h3>

                    {editPostId !== post.id
                        ?
                        <div className="post-content">Содержание поста: {post.content}</div>
                        :
                        <input
                            type='text'
                            name={'current-post'}
                            placeholder={'напишите тут'}
                            value={currentPostInputVal}
                            onInput={evt => setCurrentPostInputVal(evt.target.value)}
                        />
                    }

                    {editPostId === post.id
                        ? <>
                            <button onClick={() => {

                                setEditPostId(null);
                                Object.assign(newPost, { content: currentPostInputVal });
                                setCurrentPostInputVal('');

                                async function edit(obj) {
                                    try {
                                        const response = await fetch(`/api/forum/post/${post.id}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(obj)
                                        });
                                        console.log('adduser response', response);
                                        if (!response.ok) throw new Error('не ок');
                                        const json = await response.json();
                                        console.log('json', json);

                                        // console.log('index=', data.posts.findIndex(elem => elem.id === post.id));

                                        return {
                                            ...data //пока заглушка, потом будет с optimistic UI
                                            // ...data, posts: data.posts.splice(0, data.posts.findIndex(elem => elem.id === post.id), obj)
                                        }

                                    } catch (error) {
                                        null;
                                    }
                                }
                                try {
                                    mutate(edit(newPost));

                                } catch (error) {
                                    null;
                                } finally {
                                    null;
                                }

                            }}>Сохранить</button>

                            <button onClick={() => {
                                setEditPostId(null);
                            }}>Отмена</button>
                        </>
                        : <>
                            <button onClick={() => {
                                setEditPostId(post.id);
                                setCurrentPostInputVal(post.content);
                            }}>Редактировать</button>
                        </>
                    }

                    <div>{post.createdAt}</div>
                    <div>{post.updatedAt}</div>
                    {/* <div>ID автора для отладки: {post.userId}</div> */}

                    <button onClick={async () => {
                        async function delPost(id) {
                            try {
                                const response = await fetch(`/api/forum/post/${id}`, {
                                    method: 'DELETE',
                                });
                                console.log('adduser response', response);
                                if (!response.ok) throw new Error('не ок');
                                const json = await response.json();
                                console.log('json', json);

                                return {
                                    ...data, posts: data.posts.filter(post => id !== +post.id)
                                }

                            } catch (error) {
                                null;
                            }
                        }
                        try {
                            mutate(delPost(post.id));

                        } catch (error) {
                            null;
                        } finally {
                            null;
                        }
                    }
                    }
                    >Удалить</button>

                    <div>
                        Автор:&#8201;
                        {/* {data?.users?.find(user => post?.userId === user?.id)?.name || currentUserName} */}
                        {data?.users?.find(user => post?.userId === user?.id)?.name}
                    </div>

                    <div>
                        Статус автора:&#8201;
                        {data?.users?.find(user => post?.userId === user?.id)?.role || 'user'}
                    </div>
                </div>
            ))}
        </div >
    </div>
}