import { useState } from 'react';
import Link from "next/link";
import { useSession } from 'next-auth/react';

export default function ForumComponent({ data, mutate }) {


    const
        [newTopicInputVal, setNewTopicInputVal] = useState(''),
        [editTopicId, setEditTopicId] = useState(null),
        [currentTopicInputVal, setCurrentTopicInputVal] = useState(''),

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

    // console.log('data=', data);

    return <div className="page forum-page">
        {/* {session?.user && <div>Добро пожаловать на наш форум, {session?.user?.name}!</div>} */}
        <div>Добро пожаловать на наш форум, {session?.user ? session?.user?.name : 'Гость'}!</div>
        <h1>Форум</h1>
        <div className="topics">
            <h2>Темы для обсуждения</h2>

            {session && <div>
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

            <div className="topics-div">
                {data.topics.map((topic) => (

                    <div className="topic" key={topic.id}>
                        <h3>ID темы для отладки: {topic.id}</h3>

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
                                value={currentTopicInputVal}
                                onInput={evt => setCurrentTopicInputVal(evt.target.value)}
                            />
                        }

                        {editTopicId === topic.id
                            ? <>
                                <button onClick={() => {

                                    // newTopic.id = topic.id;
                                    setEditTopicId(null);
                                    // Object.assign(newTopic, topic, { id: topic.id, title: currentTopicInputVal });
                                    Object.assign(newTopic, { title: currentTopicInputVal });
                                    setCurrentTopicInputVal('');

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

                                            // console.log('index=', data.topics.findIndex(elem => elem.id === topic.id));

                                            return {
                                                ...data //пока заглушка, не понял, как сделать тут с optimistic UI
                                                // ...data, topics: data.topics.splice(0, data.topics.findIndex(elem => elem.id === topic.id), obj)
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
                                    setCurrentTopicInputVal(topic.title);
                                }}>Редактировать название темы</button>
                            </>
                        }

                        <div>Описание: {topic.content}</div>
                        <div>{topic.createdAt}</div>
                        <div>{topic.updatedAt}</div>
                        {/* <div>ID автора для отладки: {topic.userId}</div> */}

                        <button onClick={async () => {
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
                        >Удалить тему</button>
                        {/* <div>Автор: {topic.userName}</div> */}
                        <div>
                            Автор:&#8201;
                            {/* {data.users.find(user => topic.userId === user.id).firstName}&#8201; */}
                            {/* {data.users.find(user => topic.userId === user.id).lastName} */}
                            {data?.users?.find(user => topic?.userId === user?.id)?.name || currentUserName}
                        </div>

                        {/* поле "Статус автора" временное для отладки */}
                        <div>
                            Статус автора:&#8201;
                            {data?.users?.find(user => topic?.userId === user?.id)?.role || currentUserRole || 'user'}
                        </div>
                    </div>
                ))}
            </div>


            <div className="additional-information">
                <h2>Дополнительная информация</h2>
                <div className="additional-information-div">
                    <div>Посетители: 2</div>
                    <div>
                        <span>Статистика форума:</span>
                        <div>
                            создано тем: 3, в которые добавлено 0 ответов, зарегистрировано участников: 2.
                            Приветствуем нового участника: Хомячок
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>Это - из базы:
                {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
            </div> */}


        </div >
    </div>
}