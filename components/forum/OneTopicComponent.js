import Head from "next/head";
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    Box, Flex, Heading, Button, Stack, Text,
    // Input, Textarea, Image,
    Card, CardHeader, CardBody, CardFooter, Avatar,
    Skeleton,
    SkeletonCircle, SkeletonText,
    Menu, MenuButton, MenuList, MenuItem,
    // MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider,
} from "@chakra-ui/react";
import { h2HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
import { marginParameters } from '../../displayParameters/marginParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import ModalWindowBlur from '../../components/modalwindows/ModalWindowBlur';
import AddNewPost from '../../components/forum/AddNewPost';
import AutoResizableTextarea from '../../components/AutoResizableTextarea';
import { formatDateTime } from '../../includes/formatDate';

const Moment = require('mol_time_all').$mol_time_moment;

// console.log(new Moment());


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
        currentUserId = session?.user?.id,
        // currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    //Константы для определения прав доступа
    const
        adminOrModerator = currentUserRole === 'admin' || currentUserRole === 'moderator',
        notBanned = currentUserRole !== 'banned';

    let currentUser;

    // console.log('data=', data);

    // console.log('topicId=', topicId);

    async function changeDataEdit(obj, post) {
        try {
            const response = await fetch(`/api/forum/post/${post?.id}`, {
                method: 'PUT',
                body: JSON.stringify(obj)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('не ок');
            const json = await response.json();
            // console.log('json', json);

            return {
                ...data,
                posts: data?.posts.map(item =>
                    item?.id === post?.id ? newPost : item
                )
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }
    }

    async function changeDataDel(id) {
        try {
            const response = await fetch(`/api/forum/post/${id}`, {
                method: 'DELETE',
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);

            return {
                ...data, posts: data?.posts?.filter(post => id !== +post?.id)
            }

        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }

    }

    async function editPost(post) {
        setEditPostId(null);
        Object.assign(newPost, { content: postForEditInputVal });
        setPostForEditInputVal('');

        try {
            mutate(changeDataEdit(newPost, post));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            null;
        }
    }

    async function delPost(post) {

        try {
            mutate(changeDataDel(post?.id));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            null;
        }
    }


    return <>

        <Box m={marginParameters} className="topic-page">
            <Head>
                <title>{data?.topic?.title || 'Тема'}</title>
            </Head>

            {(!data || !Array.isArray(data?.posts)) && <>
                <Skeleton
                    height='80px'
                    mb={10}
                    p={'20px'}
                    borderRadius={'5px'}
                />
                <Box
                    height='500px'
                    borderRadius={'5px'}
                    padding='6'
                    boxShadow='lg'
                    bg='white'
                    marginTop={'20px'}
                    p={'20px'}
                >
                    <SkeletonCircle size='14' />
                    <SkeletonText mt='4' noOfLines={6} spacing='4' skeletonHeight='10' />
                </Box>
                <Box
                    height='500px'
                    borderRadius={'5px'}
                    padding='6'
                    boxShadow='lg'
                    bg='white'
                    marginTop={'20px'}
                    p={'20px'}
                >
                    <SkeletonCircle size='14' />
                    <SkeletonText mt='4' noOfLines={6} spacing='4' skeletonHeight='10' />
                </Box>
                <Box
                    height='500px'
                    borderRadius={'5px'}
                    padding='6'
                    boxShadow='lg'
                    bg='white'
                    marginTop={'20px'}
                    p={'20px'}
                >
                    <SkeletonCircle size='14' />
                    <SkeletonText mt='4' noOfLines={6} spacing='4' skeletonHeight='10' />
                </Box>

            </>}

            {Array.isArray(data?.posts) && <>
                <Box className="topic-div">

                    <Flex
                        justifyContent={'space-between'}
                        flexDirection={flexDirection}
                        alignItems={'center'}
                        mb={10}
                        p={'20px'}
                        borderRadius={'5px'}
                        background={'#121f26'}
                        color={'white'}
                    >
                        <Heading
                            fontWeight={"normal"}
                            as={'h1'}
                            fontSize={h2HeadersFontSize}
                        >
                            {data?.topic?.title}
                        </Heading>

                        {session && notBanned && data && <>
                            <ModalWindowBlur buttonText={'Написать сообщение'} buttonColorScheme={'gray'}>
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

                    {data?.posts?.map((post) => {

                        const currentUser = data?.users?.find((user) => post?.userId === user?.id);
                        const postAuthor = currentUserId === post?.userId;

                        // console.log(post?.createdAt);

                        const postCreatedSring = new Moment(post?.createdAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                        const postUpdatedSring = new Moment(post?.updatedAt).toString('YYYY-MM-DD hh:mm (WeekDay)');

                        console.log(post?.createdAt);

                        const formattedDatePostCreated = formatDateTime(postCreatedSring);
                        const formattedDatePostUpdated = formatDateTime(postUpdatedSring);

                        return (


                            <Card
                                key={post?.id + post?.userId + post?.topicId}
                                className="post"
                                marginTop={'20px'}
                                p={'20px'}
                            >

                                <CardHeader>
                                    <Flex spacing='4'>
                                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                            <Avatar name={currentUser?.name} src={currentUser?.image} />
                                            <Box>
                                                <Heading size='sm'>{currentUser?.nickname || currentUser?.name}</Heading>
                                                <Text>{currentUser?.role || 'user'}</Text>
                                                {/* <Text fontSize={textFontSize?.base}>{post?.createdAt}</Text> */}
                                                <Text fontSize={textFontSize?.base}>Опубликовано {formattedDatePostCreated}</Text>
                                                {/* <Text fontSize={textFontSize?.base}>{post?.updatedAt}</Text> */}
                                                {formattedDatePostCreated !== formattedDatePostUpdated &&
                                                    <Text fontSize={textFontSize?.base}>Отредактировано {formattedDatePostUpdated}</Text>}

                                            </Box>
                                        </Flex>
                                    </Flex>
                                </CardHeader>

                                <CardBody>
                                    {editPostId !== post.id
                                        ? <Text
                                            className="post-content"
                                            textAlign='justify'

                                        >{post?.content}</Text>
                                        : <AutoResizableTextarea
                                            fontSize={textFontSize}
                                            name={'current-post'}
                                            placeholder={'Ваше сообщение'}
                                            value={postForEditInputVal}
                                            onInput={evt => setPostForEditInputVal(evt?.target?.value)}
                                            onKeyDown={(evt) =>
                                                (evt?.keyCode === 13)
                                                    ? editPost(post)
                                                    : null
                                            }
                                        />
                                    }
                                </CardBody>
                                {/* <Text fontSize={textFontSize.base}>ID автора для отладки: {post.userId}</Text>
                                <Text fontSize={textFontSize.base}>ID поста для отладки: {post.id}</Text> */}
                                <CardFooter
                                    justify='space-between'
                                    flexWrap='wrap'
                                    sx={{
                                        '& > button': {
                                            minW: '136px',
                                        },
                                    }}
                                >
                                    {(editPostId !== post?.id) && session && notBanned
                                        ? <Menu>
                                            <MenuButton
                                                as={Button}
                                                colorScheme='gray'
                                            >Действия
                                            </MenuButton>
                                            <MenuList
                                            >
                                                {notBanned &&
                                                    <ModalWindowBlur
                                                        buttonText={'Ответить'}
                                                        buttonColorScheme={'gray'}
                                                        width={'100%'}

                                                    >
                                                        <AddNewPost
                                                            newPostInputVal={newPostInputVal}
                                                            setNewPostInputVal={setNewPostInputVal}
                                                            data={data}
                                                            mutate={mutate}
                                                            currentUserId={currentUserId}
                                                            topicId={topicId}
                                                        />
                                                    </ModalWindowBlur>
                                                }

                                                {(postAuthor || adminOrModerator) && notBanned &&
                                                    <MenuItem as={Button} colorScheme='gray' onClick={() => {
                                                        setEditPostId(post?.id);
                                                        setPostForEditInputVal(post?.content);
                                                    }}>Редактировать</MenuItem>
                                                }

                                                {adminOrModerator &&
                                                    <MenuItem as={Button} colorScheme='gray' onClick={() => delPost(post)}> Удалить </MenuItem>
                                                }

                                            </MenuList>
                                        </Menu>
                                        : (editPostId === post.id) && <>
                                            <Button colorScheme='gray' onClick={() => editPost(post)}>Сохранить
                                            </Button>
                                            <Button colorScheme='gray' onClick={() => {
                                                setEditPostId(null);
                                            }}>Отмена
                                            </Button>
                                        </>
                                    }

                                </CardFooter>
                            </Card>
                        )
                    })}
                </Box >
            </>}
        </Box >
    </>
}