import Head from "next/head";
import { Text, Box, Flex, Image, Button } from '@chakra-ui/react';
import { marginParameters } from '../../displayParameters/marginParameters';
import { HeadingForPage } from '../../components/ElemsForPages';
import Galary from '../../components/Galary';
import ContactInfo from '../../components/ContactInfo';
import TourCards from '../../components/TourCards';
import { crimeaMainImage, crimeaImages, tourDataCrimea, crimeaText } from '../../data/tourData';
import ShareButton from '../../components/ShareButton';
import { sitePath } from '../../data/sitePath';
import { useRouter } from 'next/router';


export default function CrimeaPage() {

    const
        { pathname } = useRouter(),
        shareUrl = sitePath + pathname;

    return <>
        <Head>
            <title>Крым</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={'Крым'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={crimeaMainImage} alt={'picture'} width={'50vw'} borderRadius={'5px'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                &#8194;{crimeaText}
            </Text>
            <Flex className="share-buttons" justifyContent={'center'}>
                <ShareButton type={'vk'} shareUrl={shareUrl} />
            </Flex>
            <Galary imagesArr={crimeaImages} />
            <TourCards tourData={tourDataCrimea} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}