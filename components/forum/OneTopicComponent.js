import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Head from "next/head";
import { fictionalDataForTopic } from '../../data/fictionalData';

import { Button, ButtonGroup, Input } from '@chakra-ui/react';

export default function OneTopicComponent({ data, mutate, topicId }) {

    //может попробовать скелетон?
    //Skeleton is used to display the loading state of some component.
    //https://chakra-ui.com/docs/components/skeleton
    if (!data) data = fictionalDataForTopic;

    //Константы для создания и редактирования тем
    const
        [newPostInputVal, setNewPostInputVal] = useState(''),
        [editPostId, setEditPostId] = useState(null),
        [postForEditInputVal, setPostForEditInputVal] = useState(''),
        newPost = {};

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        sessionHookResult = useSession(),
        { data: session } = useSession(),
        // const {
        //     name: currentUserName,
        //     email: currentUserEmail,
        //     image: currentUserImage,
        //     id: currentUserId,
        //     role: currentUserRole
        // } = sessionHookResult?.data?.user;
        currentUserId = sessionHookResult?.data?.user?.id,
        currentUserName = sessionHookResult?.data?.user?.name,
        currentUserRole = sessionHookResult?.data?.user?.role;

    //Константы для определения прав доступа
    const
        adminOrModerator = currentUserRole === 'admin' || currentUserRole === 'moderator',
        notBanned = currentUserRole !== 'banned';
    // const yourPost = currentUserId === 

    console.log('data=', data);

    // console.log('topicId=', topicId);

    //if (!data) <OneTopicSkeleton />
    return <div className="page topic-page">
        <Head>
            <title>{data?.topic?.title}</title>
        </Head>
        <div className="post-div">
            <h1>{data?.topic?.title}</h1>

            {session && notBanned && <div>
                <Input
                    type='search'
                    name='new-post'
                    placeholder={'пост'}
                    value={newPostInputVal}
                    onInput={evt => setNewPostInputVal(evt.target.value)}
                />
                <Button colorScheme='yellow' type='submit' onClick={async () => {
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
                }>Добавить пост</Button>
            </div>}

            {data?.posts?.map((post) => (

                <div className="post" key={post.id}>
                    <h3>ID поста для отладки: {post.id}</h3>

                    {editPostId !== post.id
                        ?
                        <div className="post-content">Содержание поста: {post.content}</div>
                        :
                        <Input
                            type='text'
                            name={'current-post'}
                            placeholder={'напишите тут'}
                            value={postForEditInputVal}
                            onInput={evt => setPostForEditInputVal(evt.target.value)}
                        />
                    }

                    {/* {session && <div> */}
                    {(currentUserId === post.userId || adminOrModerator) && notBanned && <div>
                        {editPostId === post.id
                            ? <>
                                <Button colorScheme='yellow' onClick={() => {
                                    setEditPostId(null);
                                    Object.assign(newPost, { content: postForEditInputVal });
                                    setPostForEditInputVal('');
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

                                            return {
                                                ...data,
                                                posts: data.posts.map(item =>
                                                    item.id === post.id ? newPost : item
                                                )
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
                                }}>Сохранить</Button>
                                <Button colorScheme='yellow' onClick={() => {
                                    setEditPostId(null);
                                }}>Отмена</Button>
                            </>
                            : <>
                                <Button colorScheme='yellow' onClick={() => {
                                    setEditPostId(post.id);
                                    setPostForEditInputVal(post.content);
                                }}>Редактировать</Button>
                            </>
                        }
                    </div>}

                    <div>{post.createdAt}</div>
                    <div>{post.updatedAt}</div>
                    {/* <div>ID автора для отладки: {post.userId}</div> */}

                    {adminOrModerator && <Button colorScheme='yellow' onClick={async () => {
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
                    >Удалить</Button>}

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