import Head from "next/head";
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { marginParameters } from '../../displayParameters/marginParameters';

import { HeadingForPage, Galary, ContactInfo } from '../../components/ElemsForPages';
import TourCards from '../../components/TourCards';

import { kareliaMainImage, kareliaImages, tourDataKarelia, kareliaText } from '../../data/tourData';

export default function KareliaPage() {
    return <>
        <Head>
            <title>Карелия</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={'Карелия'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={kareliaMainImage} alt={'picture'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                {kareliaText}
            </Text>
            <Galary imagesArr={kareliaImages} />
            <TourCards tourData={tourDataKarelia} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}