import Head from "next/head";
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { marginParameters } from '../../displayparameters/marginDisplayParameters';

import { useRouter } from 'next/router'
import { HeadingForPage, Galary, ContactInfo } from '../../components/ElemsForPages';
import TourCards from '../../components/TourCards';

import { places, loremIpsum } from '../../data/placesData';
import {
    loremPicsumMainImage, loremPicsumImages,
    crimeaMainImage, crimeaImages, tourDataCrimea, crimeaText,
    kareliaMainImage, kareliaImages, tourDataKarelia, kareliaText,
    kamchatkaMainImage, kamchatkaImages, tourDataKamchatka, kamchatkaText,
    voronezhMainImage, voronezhImages, tourDataVoronezh, voronezhText
} from '../../data/tourData';


export default function Place() {

    const
        { query } = useRouter();
        // { path } = query;

    // console.log(useRouter());
    // console.log('query=', query);
    // console.log('path=', path);

    const currentPlaceObj = places.find(place => place.path === query.path);

    // console.log('currentPlaceObj', currentPlaceObj);

    let mainImage, images, tourData, tourText;

    switch (currentPlaceObj.name) {
        case 'Крым': mainImage = crimeaMainImage, images = crimeaImages, tourData = tourDataCrimea, tourText = crimeaText;
            break;
        case 'Карелия': mainImage = kareliaMainImage, images = kareliaImages, tourData = tourDataKarelia, tourText = kareliaText;
            break;
        case 'Камчатка': mainImage = kamchatkaMainImage, images = kamchatkaImages, tourData = tourDataKamchatka, tourText = kamchatkaText;
            break;
        case 'Красоты земли Воронежской': mainImage = voronezhMainImage, images = voronezhImages, tourData = tourDataVoronezh, tourText = voronezhText;
            break;
        default: mainImage = loremPicsumMainImage, images = loremPicsumImages, tourData = [], tourText = loremIpsum;
            break;
    }

    return <>
        <Head>
            <title>{currentPlaceObj.name}</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={currentPlaceObj.name} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={mainImage} alt={'picture'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                {tourText}
            </Text>
            <Galary imagesArr={images} />
            <TourCards tourData={tourData} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}