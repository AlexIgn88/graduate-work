import { SWRConfig } from 'swr';
import GetData from '../../components/GetData';
import AllTopicsComponent from '../../components/forum/AllTopicsComponent';
import Head from "next/head";
import { useSession } from 'next-auth/react';
import { fictionalDataForForum } from '../../data/fictionalData'

import { Box, Flex, Spacer, Heading, Button, ButtonGroup, Input, chakra } from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../../displayParameters/fontParameters';
import { marginParameters } from '../../displayParameters/marginParameters';
import { flexDirection } from '../../displayParameters/flexParameters';


// export async function getStaticProps() {
//     return {
//         props: {
//             fallback: {
//                 '/api/forum/topic/': fictionalDataForForum
//             }
//         }
//     };
// }

export default function ForumPage({ fallback }) {

    const API_URL = '/api/forum/topic/',
        { data: session } = useSession();

    return <>
        <Head>
            <title>Форум</title>
        </Head>
        <Flex
            m={marginParameters}
            className="forum-page"
            flexDirection={'column'}
            gap={'20px'}
        >
            <Box>Добро пожаловать на наш форум, {session?.user ? session?.user?.name : 'Гость'}!</Box>
            {!session && <Box>Для общения на нашем форуме войдите, пожалуйста, в свой акаунт на сайте</Box>}

            <SWRConfig>
                {/* <SWRConfig value={{ fallback }}> */}
                <GetData url={API_URL}>
                    <AllTopicsComponent />
                </GetData>
            </SWRConfig>

            <Box
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
            </Box>

        </Flex>
    </>;
}