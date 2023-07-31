import Head from "next/head";
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import background from '../public/img/HomePage/background.jpg';

export default function HomePage() {
    return <>
        <Head>
            <title>Туристическое агентство &quot;Исторические маршруты и заповедные места&quot;</title>
        </Head>
        <Box
            className='home-page'
            position="relative"
            height="100vh"
        >

            <Image
                src={background}
                alt='Вид с Демерджи на Чатыр-даг на закате'
                placeholder="blur"
                style={{ objectFit: 'cover' }}
                fill={true}
            />
            <Box
                className='home-page-title'
                left={{ base: '30px', '2xl': '200px', xl: '150px', lg: '100px', md: '80px', sm: '50px' }}
                color={'white'}
                fontSize={'7vmin'}
                fontWeight={'bold'}
                fontFamily={'monospace'}
                position={'absolute'}
                top={'300px'}
                bottom={'0'}
                right={'0'}
            >
                <Box>ИСТОРИЧЕСКИЕ МАРШРУТЫ</Box>
                <Box>ЗАПОВЕДНЫЕ МЕСТА</Box>
            </Box>

        </Box >
    </>
}