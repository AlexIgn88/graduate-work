import Head from "next/head";
import { fictionalDataForTopic } from '../../data/fictionalData';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    Box, Flex, Heading, Button, Input,
    Stack, Image, Text,
    Card, CardBody, CardFooter,
    Skeleton, SkeletonCircle, SkeletonText
} from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
import { marginParameters } from '../../displayParameters/marginParameters';
import { flexDirection } from '../../displayParameters/flexParameters';

import ModalWindowBlur from '../../components/modalwindows/ModalWindowBlur';
import AddNewPost from '../../components/forum/AddNewPost';


export default function OneTopicComponent({ data, mutate, topicId }) {

    //Константы для создания и редактирования тем
    const
        [newPostInputVal, setNewPostInputVal] = useState(''),
        [editPostId, setEditPostId] = useState(null),
        [postForEditInputVal, setPostForEditInputVal] = useState(''),
        newPost = {};

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
    // const yourPost = currentUserId === 

    console.log('data=', data);

    console.log('topicId=', topicId);

    return <>
        <Box m={marginParameters} className="topic-page">
            <Head>
                <title>{data?.topic?.title || 'Тема'}</title>
            </Head>

            {(!data) && <>
                <Stack>
                    <Skeleton height='200px' />
                    <Skeleton height='200px' />
                    <Skeleton height='200px' />
                </Stack>
            </>}


            {data && <>
                <Box className="topic-div">


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
                            {data?.topic?.title}
                        </Heading>

                        {session && notBanned && data && <>
                            <ModalWindowBlur buttonText={'Написать сообщение'}>
                                <AddNewPost
                                    newPostInputVal={newPostInputVal}
                                    setNewPostInputVal={setNewPostInputVal}
                                    data={data}
                                    mutate={mutate}
                                    currentUserId={currentUserId}
                                    topicId={topicId}
                                />
                            </ModalWindowBlur>
                        </>}
                    </Flex>









                    {data?.posts?.map((post) => (

                        <Flex
                            className="post"
                            key={post.id}
                            marginTop={'20px'}
                            border={'1px solid black'}
                            padding={'20px'}
                            flexDirection={'column'}
                            alignItems={'flex-start'}
                            gap={'10px'}
                        >
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
                                        <Button colorScheme='orange' onClick={() => {
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
                                                    console.log(`FILE: ${__filename}\nERROR:`, error);
                                                }
                                            }
                                            try {
                                                mutate(edit(newPost));
                                            } catch (error) {
                                                console.log(`FILE: ${__filename}\nERROR:`, error);
                                            } finally {
                                                null;
                                            }
                                        }}>Сохранить</Button>
                                        <Button colorScheme='orange' onClick={() => {
                                            setEditPostId(null);
                                        }}>Отмена</Button>
                                    </>
                                    : <>
                                        <Button colorScheme='orange' onClick={() => {
                                            setEditPostId(post.id);
                                            setPostForEditInputVal(post.content);
                                        }}>Редактировать</Button>
                                    </>
                                }
                            </div>}

                            <div>{post.createdAt}</div>
                            <div>{post.updatedAt}</div>
                            {/* <div>ID автора для отладки: {post.userId}</div> */}

                            {adminOrModerator && <Button colorScheme='orange' onClick={async () => {
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
                                    console.log(`FILE: ${__filename}\nERROR:`, error);
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
                        </Flex>
                    ))}
                </Box >
            </>}









        </Box>
    </>
}