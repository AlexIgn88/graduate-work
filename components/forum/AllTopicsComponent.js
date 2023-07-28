import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Link from "next/link";
import {
    Box, Flex, Heading, Button, Input,
    Stack, Image, Text,
    Card, CardBody, CardFooter,
    Skeleton, SkeletonCircle, SkeletonText
} from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
// import { marginParameters } from '../../displayParameters/marginParameters';
import { flexDirection } from '../../displayParameters/flexParameters';

import AddNewTopic from '../../components/forum/AddNewTopic';
import ModalWindowBlur from '../../components/modalwindows/ModalWindowBlur';


export default function AllTopicsComponent({ data, mutate }) {

    //Константы для создания и редактирования тем
    const
        [newTopicInputVal, setNewTopicInputVal] = useState(''),

        [editTopicId, setEditTopicId] = useState(null),
        [topicForEditInputVal, setTopicForEditInputVal] = useState(''),
        newTopic = {};

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        // const {
        //     name: currentUserName,
        //     email: currentUserEmail,
        //     image: currentUserImage,
        //     id: currentUserId,
        //     role: currentUserRole
        // } = sessionHookResult?.data?.user;
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    //Константы для определения прав доступа
    const
        adminOrModerator = currentUserRole === 'admin' || currentUserRole === 'moderator',
        notBanned = currentUserRole !== 'banned';

    // console.log('data=', data);

    async function changeDataEdit(obj, topic) {
        try {
            const response = await fetch(`/api/forum/topic/${topic.id}`, {
                method: 'PUT',
                body: JSON.stringify(obj)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            return {
                ...data,
                topics: data.topics.map(item =>
                    item.id === topic.id ? newTopic : item
                )
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }
    }

    async function changeDatDel(id) {
        try {
            const response = await fetch(`/api/forum/topic/${id}`, {
                method: 'DELETE',
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            // console.log('удалили эту тему: ', data.topics.filter(topic => id === +topic.id));

            return {
                ...data, topics: data.topics.filter(topic => id !== +topic.id)
            }

        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }
    }

    async function editTopic(topic) {
        setEditTopicId(null);
        // Object.assign(newTopic, topic, { id: topic.id, title: currentTopicInputVal });
        Object.assign(newTopic, { title: topicForEditInputVal });
        setTopicForEditInputVal('');

        try {
            mutate(changeDataEdit(newTopic, topic));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        } finally {
            null;
        }
    }

    async function delTopic(topic) {

        try {
            mutate(changeDatDel(topic.id));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            null;
        }
    }

    return <>

        <Box className="topics">
            <Flex
                justifyContent={'space-between'}
                flexDirection={flexDirection}
                alignItems={'center'}
            >
                <Heading
                    fontWeight={"normal"}
                    mb={10}
                    as={'h1'}
                    fontSize={h2HeadersFontSize}
                >
                    Темы для обсуждения
                </Heading>

                {session && notBanned && data && <ModalWindowBlur>
                    <AddNewTopic
                        newTopicInputVal={newTopicInputVal}
                        setNewTopicInputVal={setNewTopicInputVal}
                        data={data}
                        mutate={mutate}
                        currentUserId={currentUserId}
                    />
                </ModalWindowBlur>}
            </Flex>

            {(!data) && <>
                <Stack>
                    <Skeleton height='200px' />
                    <Skeleton height='200px' />
                    <Skeleton height='200px' />
                </Stack>
            </>}

            {data && data.topics.map((topic) => (

                <Card
                    key={topic.id}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                >
                    {/* <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                        alt='Caffe Latte'
                    /> */}

                    <Stack>
                        <CardBody>
                            <Box size='md'>

                                {/* <h3>ID темы для отладки: {topic.id}</h3> */}
                                {editTopicId !== topic.id
                                    ?
                                    <Box className="topic-title">
                                        <Box bg='white' color='green'>
                                            <Link href={`/forum/topic/${topic.id}`} className="">{topic.title}</Link>
                                        </Box>
                                    </Box>
                                    :
                                    <Input
                                        type='text'
                                        name={'current-topic'}
                                        placeholder={'Новое название'}
                                        value={topicForEditInputVal}
                                        onInput={evt => setTopicForEditInputVal(evt.target.value)}
                                    />
                                }
                            </Box>

                            <Box py='2'>
                                <Box>{topic.content}</Box>
                                <Box>{topic.createdAt}</Box>
                                <Box>{topic.updatedAt}</Box>
                                <Box>
                                    Автор:&#8201;
                                    {data?.users?.find(user => topic?.userId === user?.id)?.name}
                                </Box>
                                <Box>
                                    Статус автора:&#8201;
                                    {data?.users?.find(user => topic?.userId === user?.id)?.role || 'user'}
                                </Box>
                            </Box>
                        </CardBody>

                        <CardFooter
                            flexDirection={'column'}
                            align-items={'baseline'}
                            gap={'15px'}
                        >
                            {adminOrModerator && <>
                                {editTopicId === topic.id
                                    ? <>
                                        <Button colorScheme='orange' onClick={() => editTopic(topic)}>Сохранить</Button>
                                        <Button colorScheme='orange' onClick={() => {
                                            setEditTopicId(null);
                                        }}>Отмена</Button>
                                    </>
                                    : <>
                                        <Button colorScheme='orange' onClick={() => {
                                            setEditTopicId(topic.id);
                                            setTopicForEditInputVal(topic.title);
                                        }}>Редактировать</Button>
                                    </>
                                }
                            </>}
                            {adminOrModerator && <>
                                <Button colorScheme='orange' onClick={() => delTopic(topic)}>Удалить
                                </Button>
                            </>}
                        </CardFooter>
                    </Stack>
                </Card>))}




        </Box>
    </>
}