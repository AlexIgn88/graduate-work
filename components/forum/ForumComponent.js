import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import {
    Box, Flex, Heading, Button, Input, chakra,
    Stack, Text,
    Card, CardBody, CardFooter,
    Skeleton,
    // SkeletonCircle, SkeletonText,
    Menu, MenuButton, MenuList, MenuItem,
    // MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
} from "@chakra-ui/react";
import { h2HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import ModalWindowBlur from '../modalwindows/ModalWindowBlur';
import AddNewTopic from './AddNewTopic';
import { formatDateTime } from '../../includes/formatDate';
import { FcLandscape } from "react-icons/fc";
import { marginParameters } from '../../displayParameters/marginParameters';

const Moment = require('mol_time_all').$mol_time_moment;

export default function ForumComponent({ data, mutate }) {

    //Константы для создания и редактирования тем
    const
        [newTopicInputVal, setNewTopicInputVal] = useState(''),
        [editTopicId, setEditTopicId] = useState(null),
        [topicForEditInputVal, setTopicForEditInputVal] = useState('');

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        // currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    //Константа-массив с именами зашедших пользователей
    const onlineUsers = data?.onlineUsers?.map(item =>
        data?.users?.find((user) => user?.id === item)?.nickname ||
        data?.users?.find((user) => user?.id === item)?.name);

    //Константы для определения прав доступа
    const
        adminOrModerator = currentUserRole === 'admin' || currentUserRole === 'moderator',
        notBanned = currentUserRole !== 'banned';

    const forumPaddingSeting = { base: '10px', sm: '20px', md: '30px' };

    // console.log('data=', data);
    // console.log('data.lastPosts=', data?.lastPosts);
    // console.log('onlineUsers', onlineUsers);

    async function editTopic(id) {
        setEditTopicId(null);
        const updatedTopic = Object.assign({}, { title: topicForEditInputVal });
        setTopicForEditInputVal('');

        try {
            mutate(changeDataEdit(id, updatedTopic));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        } finally {
            null;
        }
    }

    async function changeDataEdit(id, updatedTopic) {
        try {
            const response = await fetch(`/api/forum/topic/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedTopic)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            return {
                ...data,
                topics: data?.topics?.map(item =>
                    item.id === id ? updatedTopic : item
                )
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }
    }

    async function delTopic(id) {

        try {
            mutate(changeDataDel(id));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            null;
        }
    }

    async function changeDataDel(id) {
        try {
            const response = await fetch(`/api/forum/topic/${id}`, {
                method: 'DELETE',
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);

            return {
                ...data, topics: data?.topics?.filter(topic => id !== +topic?.id)
            }

        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        }
    }

    return (
        <Flex
            m={marginParameters}
            className="forum-page"
            flexDirection={'column'}
            gap={'20px'}
        >
            <Box
                p={forumPaddingSeting}
                borderRadius={'5px'}
                background={'#121f26'}
                color={'white'}
            >Добро пожаловать на наш форум, {session?.user ? session?.user?.nickname || session?.user?.name : 'Гость'}!

                {!session && (
                    <Box
                        mb={10}
                        pt={forumPaddingSeting}
                        pb={forumPaddingSeting}
                        borderRadius={'5px'}
                        background={'#121f26'}
                        color={'white'}>Для общения на нашем форуме войдите, пожалуйста, в свой акаунт на сайте
                    </Box>)}

            </Box>

            <Box
                className="topics"
            >
                <Flex
                    justifyContent={'space-between'}
                    flexDirection={flexDirection}
                    alignItems={'center'}
                    mb={10}
                    p={forumPaddingSeting}
                    gap={'10px'}
                    borderRadius={'5px'}
                    background={'#121f26'}
                    color={'white'}
                >
                    <Heading
                        fontWeight={"normal"}
                        as={'h1'}
                        fontSize={h2HeadersFontSize}
                    >
                        Темы для обсуждения
                    </Heading>

                    {session && notBanned && data && <>
                        <ModalWindowBlur buttonText={'Создать новую тему'} buttonColorScheme={'gray'}>

                            <AddNewTopic
                                newTopicInputVal={newTopicInputVal}
                                setNewTopicInputVal={setNewTopicInputVal}
                                data={data}
                                mutate={mutate}
                                currentUserId={currentUserId}
                            />

                        </ModalWindowBlur>
                    </>}
                </Flex>

                {(!data || !Array.isArray(data?.topics)) && <>
                    <Stack>
                        <Skeleton height='200px' />
                        <Skeleton height='200px' />
                        <Skeleton height='200px' />
                    </Stack>
                </>}

                {Array.isArray(data?.topics) &&
                    data?.topics?.map((topic) => {
                        topic.lastPost = data?.lastPosts?.find((lastPost) => topic?.id === lastPost?.topicId);
                        return topic
                    }).sort((a, b) => b.lastPost?.id - a.lastPost?.id)
                        .filter((topic) => {
                            switch (topic?.title) {
                                case 'тестовая тема для проверки корректного времени':
                                    // case '':
                                    // case '':
                                    return false;
                                default:
                                    return true;
                            }
                        })
                        .map((topic) => {

                            const currentUser = data?.users?.find((user) => topic?.userId === user?.id);

                            // const lastPost = data?.lastPosts?.find((lastPost) => topic?.id === lastPost?.topicId);
                            const lastPostAuthor = data?.users?.find((user) => user?.id === topic.lastPost?.userId)?.nickname ||
                                data?.users?.find((user) => user?.id === topic.lastPost?.userId)?.name;

                            // console.log('lastPostAuthor', lastPostAuthor);
                            // console.log(topic?.createdAt);

                            const topicCreatedString = new Moment(topic?.createdAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                            // const topicUpdatedSring = new Moment(topic?.updatedAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                            const formattedDateTopicCreated = formatDateTime(topicCreatedString);
                            // const formattedDateTopicUpdated = formatDateTime(topicUpdatedSring);

                            const lastPostCreatedAtString = new Moment(topic.lastPost?.createdAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                            const formattedDateLastPostCreatedAt = formatDateTime(lastPostCreatedAtString);

                            return (
                                <Flex
                                    key={topic?.title}
                                    mb={'10px'}
                                >

                                    <Card
                                        direction={{ base: 'column', sm: 'row' }}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        flexGrow={'1'}
                                        overflow='hidden'
                                        variant='outline'
                                        p={'20px'}
                                    >
                                        <Stack flexGrow={'1'}>
                                            <CardBody>
                                                <Flex
                                                    flexDirection={flexDirection}
                                                    alignItems={{ base: 'flex-start', lg: 'center' }}
                                                    justifyContent={'flex-start'}
                                                    gap={{ base: '10px', lg: '30px' }}
                                                >
                                                    <Flex flexDirection={flexDirection} alignItems={'center'} gap={'40px'}>
                                                        <Box><Text as={FcLandscape} /></Box>
                                                        <Box size='md'>
                                                            {/* <h3>ID темы для отладки: {topic.id}</h3> */}
                                                            {editTopicId !== topic?.id
                                                                ?
                                                                <Box
                                                                    className="topic-title"
                                                                >
                                                                    <Flex
                                                                        color={'blue.600'}
                                                                        fontSize={h2HeadersFontSize}
                                                                        alignItems={'stretch'}
                                                                        gap={'30px'}
                                                                    >

                                                                        <Link href={`/forum/topic/${topic?.id}`} className="">{topic?.title}</Link>
                                                                    </Flex>
                                                                </Box>
                                                                :
                                                                <Input
                                                                    type='text'
                                                                    name={'current-topic'}
                                                                    placeholder={'Новое название'}
                                                                    value={topicForEditInputVal}
                                                                    onInput={evt => setTopicForEditInputVal(evt?.target?.value)}
                                                                    onKeyDown={(evt) =>
                                                                        (evt?.keyCode === 13)
                                                                            ? editTopic(topic.id)
                                                                            : null
                                                                    }
                                                                />
                                                            }
                                                            <Box py='2'>
                                                                <Box>{topic?.content}</Box>
                                                                {/* <Text fontSize={textFontSize?.base}>{topic?.createdAt}</Text> */}
                                                                <Text fontSize={textFontSize?.base}>
                                                                    Тема создана {formattedDateTopicCreated}
                                                                </Text>
                                                                {/* <Text fontSize={textFontSize?.base}>{topic?.updatedAt}</Text> */}
                                                                {/* <Text fontSize={textFontSize?.base}>Тема обновлена {formattedDateTopicUpdated}</Text> */}
                                                                <Box>
                                                                    Автор темы:&#8201;
                                                                    {currentUser?.nickname || currentUser?.name}
                                                                </Box>
                                                                {/* <Box>
                                                                    Статус автора:&#8201;
                                                                    {currentUser?.role || 'user'}
                                                                </Box> */}
                                                            </Box>
                                                        </Box>
                                                    </Flex>

                                                    <Flex flexGrow={'1'} justifyContent={'flex-end'}>
                                                        <Flex flexDirection={'column'} mr={marginParameters}>
                                                            <Text>Последнее сообщение от пользователя {lastPostAuthor}</Text>
                                                            <Text>Написано в {formattedDateLastPostCreatedAt}</Text>
                                                        </Flex>
                                                    </Flex>

                                                </Flex>

                                            </CardBody>

                                            <CardFooter>
                                                {(editTopicId !== topic?.id) && adminOrModerator
                                                    ? <Menu>
                                                        <MenuButton
                                                            as={Button}
                                                            colorScheme='gray'
                                                        >Действия
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem as={Button} colorScheme='gray' onClick={() => {
                                                                setEditTopicId(topic?.id);
                                                                setTopicForEditInputVal(topic?.title);
                                                            }}>Редактировать</MenuItem>

                                                            <MenuItem as={Button} colorScheme='gray' onClick={() =>
                                                                delTopic(topic?.id)
                                                            }> Удалить </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                    : (editTopicId === topic.id) && <>
                                                        <Button colorScheme='gray' onClick={() => editTopic(topic.id)}>Сохранить
                                                        </Button>
                                                        <Button colorScheme='gray' onClick={() => {
                                                            setEditTopicId(null);
                                                        }}>Отмена
                                                        </Button>
                                                    </>
                                                }
                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </Flex>)
                        })}
            </Box >

            <Box
                className="additional-information"
                mb={10}
                p={forumPaddingSeting}
                borderRadius={'5px'}
                background={'#121f26'}
                color={'white'}
            >
                <Heading
                    fontWeight={"normal"}
                    mb={10}
                    as={'h1'}
                    fontSize={h2HeadersFontSize}
                >
                    Дополнительная информация
                </Heading>
                <Box className="additional-information-div">
                    <Box>Сейчас в онлайне: {onlineUsers?.map((user, i) => <chakra.span key={i}>{user},&#160;</chakra.span>)}
                    </Box>
                    <Box>
                        <chakra.span>Статистика форума:</chakra.span>
                        <Box>
                            создано тем: {(data?.topics?.length || 1) - 1}, в которые добавлено ответов: {data?.posts?.length}, зарегистрировано участников: {data?.users?.length}.
                            {/* Приветствуем нового участника: Василий Теркин. */}
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Flex>)
}