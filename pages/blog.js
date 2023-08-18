import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { Text, Box, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';

export default function BlogPage() {
    let articles = [
        { id: '1', name: 'История Генуэзской крепости в Крыму', path: 'genoese-fortress', img: '/img/BlogPage/Genoese fortress.jpg' },
        // { id: '2', name: 'Тестовая карточка', path: 'test', img: null },

        // { id: '3', name: 'Тестовая карточка', path: 'test', img: null },
        // { id: '4', name: 'Тестовая карточка', path: 'test', img: null },
        // { id: '5', name: 'Тестовая карточка', path: 'test', img: null },
        // { id: '6', name: 'Тестовая карточка', path: 'test', img: null },
        // { id: '7', name: 'Тестовая карточка', path: 'test', img: null },
        // { id: '8', name: 'Тестовая карточка', path: 'test', img: null },
    ];

    return <>
        <Head>
            <title>Блог</title>
        </Head>
        <Box
            className="blog-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >

            {/* <h1>Блог</h1> */}

            <UnorderedList className="cards" styleType={'none'} display={'flex'} justifyContent={'center'} flexWrap={'wrap'}>
                {articles.map(article => (
                    <ListItem key={article.id}>
                        <Link href={`/blog/${article.path}`} className="one-card">
                            <Flex alignItems={'center'} gap={'10px'}>
                                <Text width={'100%'} textAlign={'center'}>{article.name}</Text>
                                <Image
                                    className="card-img"
                                    src={article.img ? article.img : "/img/favicon.png"}
                                    alt={article.name}
                                    width={500}
                                    height={500}
                                    priority={true}
                                    style={{ borderRadius: '10px' }}
                                />
                            </Flex>
                        </Link>
                    </ListItem>
                ))}
            </UnorderedList>
        </Box>
    </>
}