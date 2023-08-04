import { SWRConfig } from 'swr';
import GetData from '../../components/GetData';
import AllTopicsComponent from '../../components/forum/AllTopicsComponent';
import Head from "next/head";
import { useSession } from 'next-auth/react';
import { Box, Flex } from "@chakra-ui/react";
import { marginParameters } from '../../displayParameters/marginParameters';
import { Global } from '@emotion/react';
import darkGlobalStyles from '../../displayParameters/darkGlobalStyles';


export default function ForumPage() {

    const API_URL = '/api/forum/topic/',
        { data: session } = useSession();

    // console.log('session?.user', session?.user);

    return <>
        <Head>
            <title>Форум</title>
        </Head>

        <Global styles={darkGlobalStyles} />

        <Flex
            m={marginParameters}
            className="forum-page"
            flexDirection={'column'}
            gap={'20px'}
        >
            <Box
                mb={10}
                p={'20px'}
                borderRadius={'5px'}
                background={'#121f26'}
                color={'white'}
            >Добро пожаловать на наш форум, {session?.user ? session?.user?.nickname || session?.user?.name : 'Гость'}!

                {!session && <Box mb={10}
                    pt={'20px'}
                    borderRadius={'5px'}
                    background={'#121f26'}
                    color={'white'}>Для общения на нашем форуме войдите, пожалуйста, в свой акаунт на сайте
                </Box>}

            </Box>

            <SWRConfig>
                {/* <SWRConfig value={{ fallback }}> */}
                <GetData url={API_URL}>
                    <AllTopicsComponent />
                </GetData>
            </SWRConfig>

            {/* <Box
                className="additional-information"
                border={'1px solid black'}
                borderRadius={'10px'}
                padding={'30px'}
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
                    <Box>Посетители: 2</Box>
                    <Box>
                        <chakra.span>Статистика форума:</chakra.span>
                        <Box>
                            создано тем: 3, в которые добавлено 0 ответов, зарегистрировано участников: 2.
                            Приветствуем нового участника: Василий Теркин.
                        </Box>
                    </Box>
                </Box>
            </Box> */}

        </Flex>
    </>;
}