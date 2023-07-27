import Head from "next/head";
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { marginParameters } from '../../displayParameters/marginParameters';


import { HeadingForPage, Galary, ContactInfo } from '../../components/ElemsForPages';
import TourCards from '../../components/TourCards';

import { kamchatkaMainImage, kamchatkaImages, tourDataKamchatka, kamchatkaText } from '../../data/tourData';

export default function KamchatkaPage() {
    return <>
        <Head>
            <title>Камчатка</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={'Камчатка'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={kamchatkaMainImage} alt={'picture'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                {kamchatkaText}
            </Text>
            <Galary imagesArr={kamchatkaImages} />
            <TourCards tourData={tourDataKamchatka} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}