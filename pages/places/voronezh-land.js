import Head from "next/head";
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { marginParameters } from '../../displayParameters/marginParameters';

import { HeadingForPage, Galary, ContactInfo } from '../../components/ElemsForPages';
import TourCards from '../../components/TourCards';


import { voronezhMainImage, voronezhImages, tourDataVoronezh, voronezhText } from '../../data/tourData';

export default function VoronezhLandPage() {
    return <>
        <Head>
            <title>Красоты земли Воронежской</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={'Красоты земли Воронежской'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={voronezhMainImage} alt={'picture'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                {voronezhText}
            </Text>
            <Galary imagesArr={voronezhImages} />
            <TourCards tourData={tourDataVoronezh} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}