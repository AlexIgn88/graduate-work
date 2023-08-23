import Head from "next/head";
import { Text, Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { marginParameters, halfMarginParameters } from '../../displayParameters/marginParameters';
import { HeadingForPage } from '../../components/ElemsForPages';
import Galary from '../../components/Galary';
import ContactInfo from '../../components/ContactInfo';
import TourCards from '../../components/TourCards';
import { kareliaMainImage, kareliaImages, tourDataKarelia, kareliaText } from '../../data/tourData';
import ShareButton from '../../components/ShareButton';
import { sitePath } from '../../data/sitePath';
import { useRouter } from 'next/router';

export default function KareliaPage() {

    const
        { pathname } = useRouter(),
        shareUrl = sitePath + pathname;

    return <>
        <Head>
            <title>Карелия</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <HeadingForPage element={'h1'} content={'Карелия'} />
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image
                    src={kareliaMainImage}
                    alt={'picture'}
                    height={500}
                    width={500}
                    priority={true}
                    style={{
                        borderRadius: '5px',
                        width: '50vw',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </Flex>
            <Text textAlign={'justify'} mb={10}>
                &#8194;{kareliaText}
            </Text>
            <Flex className="share-buttons" justifyContent={'center'} gap={'10px'}>
                <ShareButton type={'vk'} shareUrl={shareUrl} />
                <ShareButton type={'telegram'} shareUrl={shareUrl} />
                <ShareButton type={'whatsapp'} shareUrl={shareUrl} />
            </Flex>
            <Galary imagesArr={kareliaImages} />
            <TourCards tourData={tourDataKarelia} />
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}