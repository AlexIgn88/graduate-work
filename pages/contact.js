import Head from "next/head";
import ContactInfo from '../components/ContactInfo';
import { Text, Button, Box, Flex, Divider } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import Link from 'next/link';


export default function ContactsPage() {

    return <>
        <Head>
            <title>Контакты</title>
        </Head>
        <Flex
            className="contacts-page"
            m={halfMarginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'80px'}
        >
            <HeadingForPage element={'h1'} content={'Наши контакты'} />
            <Flex
                flexDirection={flexDirection}
                gap={'5vw'}
            >
                <Flex
                    flexDirection={{ base: 'row', md: 'column' }}
                    justifyContent={'space-evenly'}
                    gap={'5vw'}
                    flexWrap={'wrap'}
                >
                    <Text >Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</Text>
                    <ContactInfo />
                    <Divider />
                    <Flex flexDirection={{ base: 'column', md: 'row' }} gap={'20px'}>
                        <Button colorScheme='facebook'>Вконтакте</Button>
                        <Button colorScheme='telegram'>Telegram</Button>
                        <Button colorScheme='whatsapp'>Whatsapp</Button>
                    </Flex>
                </Flex>
                <Box
                    position={'relative'}
                    overflow={'hidden'}
                    w={{ base: '80vw', md: 'auto' }}
                >
                    <Link href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
                        style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}
                    >
                        Москва
                    </Link>
                    <Link href="https://yandex.ru/maps/213/moscow/house/krasnaya_ploshchad_1/Z04YcAZnTkIOQFtvfXt0dH5nYg==/?indoorLevel=1&ll=37.618366%2C55.755080&utm_medium=mapframe&utm_source=maps&z=17.74"
                        style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}
                    >
                        Красная площадь, 1 — Яндекс-Карты
                    </Link>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?indoorLevel=1&ll=37.618366%2C55.755080&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzkzNzMyNxI80KDQvtGB0YHQuNGPLCDQnNC-0YHQutCy0LAsINCa0YDQsNGB0L3QsNGPINC_0LvQvtGJ0LDQtNGMLCAxIgoNm3gWQhVfBV9C&z=17.74"
                        width="560"
                        height="400"
                        allowFullScreen={true}
                        style={{ position: "relative", borderRadius: '10px' }}
                    ></iframe>
                </Box>
            </Flex>
        </Flex>
    </>
}