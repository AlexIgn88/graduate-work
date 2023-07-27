import Head from "next/head";
import {
    Heading, Text, Box, Flex, Grid, Image, UnorderedList, List, ListItem, ListIcon, chakra, Stack
} from '@chakra-ui/react';
import { h1HeadersFontSize, textFontSize } from '../../displayparameters/fontDisplayParameters';
import { marginParameters } from '../../displayparameters/marginDisplayParameters';
import { flexDirection } from '../../displayparameters/flexDisplayParameters';
import { HeadingForPage } from '../../components/ElemsForPages';
import { FaBusAlt } from 'react-icons/fa';

import { ModalWindowRecordingForATour } from "../../components/modalwindows/ModalWindowRecordingForATour";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { ContactInfo } from '../../components/ElemsForPages';

import { tourDataCrimea } from '../../data/tourData'


export default function CrimeaPage() {

    const images = [
        '/img/favicon.png',
        '/img/favicon.png',
        '/img/favicon.png',
        '/img/favicon.png',
        '/img/favicon.png',
        '/img/favicon.png',
    ];

    return <>
        <Head>
            <title>Крым</title>
        </Head>
        <Box
            className='crimea-page'
            m={marginParameters}
        >

            {/*Заголовок*/}
            <HeadingForPage element={'h1'} content={'Крым'} />

            {/*Картинка*/}
            <Flex
                justifyContent='center'
                mb={10}
            >
                <Image src={'/img/favicon.png'} alt={'picture'} />
            </Flex>

            {/*Text*/}
            <Text textAlign={'justify'} mb={10}>
                Крым - жемчужина на Чёрноморском побережье России, место с удивительной красотой природы и богатой историей.
                Этот полуостров с мягким климатом и множеством солнечных дней притягивает туристов со всего мира.
                В Крыму можно насладиться разнообразием достопримечательностей, которые следует посетить во время увлекательного путешествия."

                1. Ялта и Ливадия - знаменитые курортные города, известные своими прекрасными пляжами и историческими зданиями.
                В Ялте стоит посетить Ливадийский дворец, который служил резиденцией российских императоров,
                и прогуляться по набережной, наслаждаясь великолепным видом на море.
                2. Севастополь - важный исторический и морской город, славящийся своими военно-морскими достижениями.
                Здесь можно посетить легендарную Севастопольскую бухту, обойти Панораму обороны Севастополя и узнать больше о героической истории этого города.
                3. Бахчисарай - город, который прославился своим Дворцово-парковым ансамблем ханского дворца.
                Величественные дворцы, красивые сады и узкие улочки Бахчисарая переносят вас во времена Крымского ханства.
                4. Гора Ай-Петри - очаровывает своей красотой и панорамными видами. Чтобы подняться на гору, можно воспользоваться канатной дорогой,
                которая сама по себе является одной из главных достопримечательностей Крыма.
                5. Судак и его легендарная крепость Генуэзский форт - прекрасное место для пляжного отдыха и осмотра исторических сооружений.
                Крепость была построена в 14 веке и до сих пор впечатляет своей мощью и архитектурой.
                6. Балаклава - уникальная бухта с прозрачными водами и красивыми пляжами.
                Здесь можно провести время наслаждаясь плаванием, подводным дайвингом или просто наслаждаться живописным пейзажем.
                Крым предлагает множество возможностей для отдыха и путешествий.
                Это лишь небольшой обзор достопримечательностей этого прекрасного региона, каждая из которых заслуживает посещения.
                Независимо от того, являетесь ли вы любителем истории, природы или просто ищете отдых на пляже,
                вы обязательно найдете что-то интересное и запоминающееся в Крыму.
            </Text>

            {/*Галерея*/}
            <Box
                p={4}
                mb={10}
            >
                <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={`Картинка ${index + 1}`}
                        />
                    ))}
                </Grid>
            </Box>

            {/*Карточки из чакры*/}

            <List spacing={3} mb={10}>
                {tourDataCrimea.map(tour => (
                    <ListItem key={tour.tourName}>
                        {/* <ListIcon as={FaBusAlt} color='yellow.500' /> */}
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                        >
                            {/* <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                // src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                                // scr='/img/favicon.png'
                                alt='tour'
                            /> */}
                            <Image
                                src={'/img/favicon.png'}
                                alt={'tour'}
                                // w={'82px'}
                                // h={'82px'}
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                            />

                            <Stack>
                                <CardBody>
                                    <Heading size='md'>{tour.tourName}</Heading>
                                    <Box py='2'>
                                        <List >
                                            {tour.tourInformation.map((item, i) => (
                                                <ListItem key={i}>
                                                    <ListIcon as={FaBusAlt} color='yellow.500' />
                                                    {Object.values(item)[0]}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </CardBody>
                                <CardFooter>
                                    {/* <Button variant='solid' colorScheme='blue'>
                                        Записаться
                                    </Button> */}
                                    <ModalWindowRecordingForATour />
                                </CardFooter>
                            </Stack>
                        </Card>
                    </ListItem>
                ))}
            </List>



            {/*дополнительный component - он стандартен для всех таких страничек*/}
            <Box mb={10}>
                <Text>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</Text>
                <ContactInfo />
            </Box>
        </Box>
    </>
}