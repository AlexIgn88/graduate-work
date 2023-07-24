import { useState } from 'react';
import Link from "next/link";
import { useSession } from 'next-auth/react';

import { fictionalDataForForum } from '../includes/fictionalData'

// export default function ForumComponent({ data, fictionalData, mutate }) {
export default function AllTopicsComponent({ data, mutate }) {

    //временная затычка до установки статических пропсов
    //может мне попробовать скелетон?
    //Skeleton is used to display the loading state of some component.
    //https://chakra-ui.com/docs/components/skeleton
    if (!data) data = fictionalDataForForum;

    const
        [newTopicInputVal, setNewTopicInputVal] = useState(''),
        [editTopicId, setEditTopicId] = useState(null),
        [topicForEditInputVal, setTopicForEditInputVal] = useState(''),

        newTopic = {},

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

    const
        adminOrModerator = currentUserRole === 'admin' || currentUserRole === 'moderator',
        notBanned = currentUserRole !== 'banned';

    // console.log('data=', data);

    return <div className="topics">
        <h2>Темы для обсуждения</h2>

        {session && notBanned && <div>
            <input
                type='search'
                name='new-topic'
                placeholder={'Название новой темы'}
                value={newTopicInputVal}
                onInput={evt => setNewTopicInputVal(evt.target.value)}
            />
            <button type='submit' onClick={async () => {
                async function addTopic(formData) {
                    try {
                        const response = await fetch('/api/forum/topic/', {
                            method: 'POST',
                            body: JSON.stringify(formData)
                        });
                        console.log('adduser response', response);
                        if (!response.ok) throw new Error('не ок');
                        const json = await response.json();
                        console.log('json', json);
                        return {
                            ...data, topics: [...data.topics, json]
                        }
                    } catch (error) {
                        null;
                    }
                }
                try {
                    const formData = {
                        title: newTopicInputVal,
                        content: 'описание темы', //временная затычка
                        createdAt: null, //временная затычка
                        updatedAt: null, //временная затычка
                        userId: currentUserId
                    };
                    mutate(addTopic(formData));
                    setNewTopicInputVal('');
                } catch (error) {
                    null;
                } finally {
                    null;
                }
            }
            }>Добавить тему</button>
        </div>}

        {/* {false && data.topics.map((topic) => ( */}
        {data.topics.map((topic) => (

            <div className="topic" key={topic.id}>
                {/* <h3>ID темы для отладки: {topic.id}</h3> */}

                {editTopicId !== topic.id
                    ?
                    <div className="topic-title">
                        <Link href={`/forum/topic/${topic.id}`} className=""><h3>{topic.title}</h3></Link>
                    </div>
                    :
                    <input
                        type='text'
                        name={'current-topic'}
                        placeholder={'Новое название'}
                        value={topicForEditInputVal}
                        onInput={evt => setTopicForEditInputVal(evt.target.value)}
                    />
                }

                {adminOrModerator && <div>
                    {editTopicId === topic.id
                        ? <>
                            <button onClick={() => {
                                setEditTopicId(null);
                                // Object.assign(newTopic, topic, { id: topic.id, title: currentTopicInputVal });
                                Object.assign(newTopic, { title: topicForEditInputVal });
                                setTopicForEditInputVal('');
                                async function edit(obj) {
                                    try {
                                        const response = await fetch(`/api/forum/topic/${topic.id}`, {
                                            method: 'PUT',
                                            body: JSON.stringify(obj)
                                        });
                                        console.log('adduser response', response);
                                        if (!response.ok) throw new Error('не ок');
                                        const json = await response.json();
                                        console.log('json', json);
                                        return {
                                            ...data,
                                            topics: data.topics.map(item =>
                                                item.id === topic.id ? newTopic : item
                                            )
                                        }
                                    } catch (error) {
                                        null;
                                    }
                                }
                                try {
                                    mutate(edit(newTopic));
                                } catch (error) {
                                    null;
                                } finally {
                                    null;
                                }
                            }}>Сохранить название темы</button>
                            <button onClick={() => {
                                setEditTopicId(null);
                            }}>Отмена</button>
                        </>
                        : <>
                            <button onClick={() => {
                                setEditTopicId(topic.id);
                                setTopicForEditInputVal(topic.title);
                            }}>Редактировать название темы</button>
                        </>
                    }
                </div>}

                <div>Описание: {topic.content}</div>
                <div>{topic.createdAt}</div>
                <div>{topic.updatedAt}</div>
                {/* <div>ID автора для отладки: {topic.userId}</div> */}

                {adminOrModerator && <button onClick={async () => {
                    async function delTopic(id) {
                        try {
                            const response = await fetch(`/api/forum/topic/${id}`, {
                                method: 'DELETE',
                            });
                            console.log('adduser response', response);
                            if (!response.ok) throw new Error('не ок');
                            const json = await response.json();
                            console.log('json', json);

                            // console.log('удалили это: ', data.topics.filter(topic => id === +topic.id));

                            return {
                                ...data, topics: data.topics.filter(topic => id !== +topic.id)
                            }

                        } catch (error) {
                            null;
                        }
                    }
                    try {
                        mutate(delTopic(topic.id));

                    } catch (error) {
                        null;
                    } finally {
                        null;
                    }
                }
                }
                >Удалить тему</button>}

                <div>
                    Автор:&#8201;
                    {/* {data?.users?.find(user => topic?.userId === user?.id)?.name || currentUserName} */}
                    {data?.users?.find(user => topic?.userId === user?.id)?.name}
                </div>

                <div>
                    Статус автора:&#8201;
                    {data?.users?.find(user => topic?.userId === user?.id)?.role || 'user'}
                </div>
            </div>
        ))}
    </div>
}