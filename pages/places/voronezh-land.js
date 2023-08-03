import Head from "next/head";
import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { marginParameters } from '../../displayParameters/marginParameters';
import { HeadingForPage } from '../../components/ElemsForPages';
import Galary from '../../components/Galary';
import ContactInfo from '../../components/ContactInfo';
import TourCards from '../../components/TourCards';
import { voronezhMainImage, voronezhImages, tourDataVoronezh, voronezhText } from '../../data/tourData';
import ShareButton from '../../components/ShareButton';
import { sitePath } from '../../data/sitePath';
import { useRouter } from 'next/router';

export default function VoronezhLandPage() {

    const
        { pathname } = useRouter(),
        shareUrl = sitePath + pathname;

    return <>
        <Head>
            <title>Воронежская область</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >
            <HeadingForPage element={'h1'} content={'Воронежская область'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={voronezhMainImage} alt={'picture'} width={'50vw'} borderRadius={'5px'} />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                &#8194;{voronezhText}
            </Text>
            <Flex className="share-buttons" justifyContent={'center'} gap={'10px'}>
                <ShareButton type={'vk'} shareUrl={shareUrl} />
                <ShareButton type={'telegram'} shareUrl={shareUrl} />
                <ShareButton type={'whatsapp'} shareUrl={shareUrl} />
            </Flex>
            <Galary imagesArr={voronezhImages} />
            <TourCards tourData={tourDataVoronezh} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}