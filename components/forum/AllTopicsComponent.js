import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from "next/link";
import {
    Box, Flex, Heading, Button, Input,
    Stack, Text,
    Card, CardBody, CardFooter,
    Skeleton,
    // SkeletonCircle, SkeletonText,
    Menu, MenuButton, MenuList, MenuItem,
    // MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider
} from "@chakra-ui/react";
import { h2HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import ModalWindowBlur from '../../components/modalwindows/ModalWindowBlur';
import AddNewTopic from '../../components/forum/AddNewTopic';
import { formatDateTime } from '../../includes/formatDate';
import { FcAnswers } from "react-icons/fc";

const Moment = require('mol_time_all').$mol_time_moment;

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
        currentUserId = session?.user?.id,
        // currentUserName = session?.user?.name,
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
                topics: data?.topics?.map(item =>
                    item.id === topic.id ? newTopic : item
                )
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
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
            mutate(changeDataDel(topic?.id));
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            null;
        }
    }

    return <>

        <Box
            className="topics"
        >
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

            {Array.isArray(data?.topics) && data?.topics?.map((topic) => {

                const currentUser = data?.users?.find((user) => topic?.userId === user?.id);
                // const topicAuthor = currentUserId === topic?.userId;

                // console.log(topic?.createdAt);

                const topicCreatedSring = new Moment(topic?.createdAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                // const topicUpdatedSring = new Moment(topic?.updatedAt).toString('YYYY-MM-DD hh:mm (WeekDay)');
                const formattedDateTopicCreated = formatDateTime(topicCreatedSring);
                // const formattedDateTopicUpdated = formatDateTime(topicUpdatedSring);

                return (

                    <Card
                        key={topic?.title}
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        p={'20px'}
                    >
                        <Stack>
                            <CardBody>
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
                                                <Text as={FcAnswers} />
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
                                                    ? editTopic(topic)
                                                    : null
                                            }
                                        />
                                    }
                                </Box>

                                <Box py='2'>
                                    <Box>{topic?.content}</Box>
                                    {/* <Text fontSize={textFontSize?.base}>{topic?.createdAt}</Text> */}
                                    <Text fontSize={textFontSize?.base}>
                                        Тема создана {formattedDateTopicCreated}
                                    </Text>
                                    {/* <Text fontSize={textFontSize?.base}>{topic?.updatedAt}</Text> */}
                                    {/* <Text fontSize={textFontSize?.base}>Тема обновлена {formattedDateTopicUpdated}</Text> */}
                                    <Box>
                                        Автор:&#8201;
                                        {currentUser?.nickname || currentUser?.name}
                                    </Box>
                                    <Box>
                                        Статус автора:&#8201;
                                        {currentUser?.role || 'user'}
                                    </Box>
                                </Box>
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
                                                delTopic(topic)
                                            }> Удалить </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    : (editTopicId === topic.id) && <>
                                        <Button colorScheme='gray' onClick={() => editTopic(topic)}>Сохранить
                                        </Button>
                                        <Button colorScheme='gray' onClick={() => {
                                            setEditTopicId(null);
                                        }}>Отмена
                                        </Button>
                                    </>
                                }
                            </CardFooter>
                        </Stack>
                    </Card>)
            })}
        </Box>
    </>
}