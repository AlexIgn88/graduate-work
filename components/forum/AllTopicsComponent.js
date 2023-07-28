import { useState } from 'react';
import { useSession } from 'next-auth/react';

import AddNewTopic from '../../components/forum/AddNewTopic';

import Link from "next/link";
import { Box, Flex, Spacer, Heading, Button, ButtonGroup, Input } from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';

export default function AllTopicsComponent({ data, mutate }) {
    //может мне попробовать скелетон потом вместо статических пропсов?
    //Skeleton is used to display the loading state of some component.
    //https://chakra-ui.com/docs/components/skeleton


    //Константы для создания и редактирования тем
    const
        [newTopicInputVal, setNewTopicInputVal] = useState(''),

        [editTopicId, setEditTopicId] = useState(null),
        [topicForEditInputVal, setTopicForEditInputVal] = useState(''),
        newTopic = {};

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

    // console.log('data=', data);
    // console.log('newTopicInputVal', newTopicInputVal);
    // console.log('mutate', mutate);


    //if (!data) <AllTopicsSkeleton />
    return <>
        <Box className="topics">
            <Heading
                fontWeight={"normal"}
                mb={10}
                as={'h1'}
                fontSize={h2HeadersFontSize}
            >
                Темы для обсуждения
            </Heading>

            {session && notBanned && <AddNewTopic
                newTopicInputVal={newTopicInputVal}
                setNewTopicInputVal={setNewTopicInputVal}
                mutate={mutate}
                currentUserId={currentUserId} />}

            {data.topics.map((topic) => (

                <div className="topic" key={topic.id}>
                    {/* <h3>ID темы для отладки: {topic.id}</h3> */}

                    {editTopicId !== topic.id
                        ?
                        <div className="topic-title">

                            <Box bg='white' color='green'>
                                <Link href={`/forum/topic/${topic.id}`} className=""><h3>{topic.title}</h3></Link>
                            </Box>

                            {/* <Box>
                            <Link
                                href={`/forum/topic/${topic.id}`}
                                className=""
                            // fontSize="3xl"
                            // fontWeight="bold"
                            // fontFamily='sans-serif'
                            >{topic.title}
                            </Link>
                        </Box> */}
                        </div>
                        :
                        <Input
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
                                <Button colorScheme='yellow' onClick={() => {
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
                                }}>Сохранить название темы</Button>
                                <Button colorScheme='yellow' onClick={() => {
                                    setEditTopicId(null);
                                }}>Отмена</Button>
                            </>
                            : <>
                                <Button colorScheme='yellow' onClick={() => {
                                    setEditTopicId(topic.id);
                                    setTopicForEditInputVal(topic.title);
                                }}>Редактировать название темы</Button>
                            </>
                        }
                    </div>}

                    <div>Описание: {topic.content}</div>
                    <div>{topic.createdAt}</div>
                    <div>{topic.updatedAt}</div>
                    {/* <div>ID автора для отладки: {topic.userId}</div> */}

                    {adminOrModerator && <Button colorScheme='yellow' onClick={async () => {
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
                    >Удалить тему</Button>}

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
        </Box>
    </>
}