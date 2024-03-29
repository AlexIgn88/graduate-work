import Head from "next/head";
import { Text, Box, Flex } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import { FactForAboutPage, ServiceForAboutPage } from '../components/ElemsForAboutPage';

export default function AboutPage() {

    const property = {
        gap: { base: '10px', sm: '70px' }
    }

    return <>
        <Head>
            <title>О нас</title>
        </Head>
        <Box
            className='about-page'
            mb={'30px'}
        >

            <Box
                m={marginParameters}
                mt={halfMarginParameters}
                mb={halfMarginParameters}
            >
                <HeadingForPage element={'h1'} content={'О компании'} />
                <Text
                    textAlign={'justify'}
                    fontFamily={'cursive'}
                >
                    Мы - туристическое агентство &quot;Исторические маршруты и заповедные места&quot;,
                    которое предлагает увлекательные путешествия по историческим местам и заповедникам.
                    Наша команда профессионалов с многолетним опытом работы в сфере туризма готова помочь вам организовать незабываемое путешествие.
                    Мы предлагаем широкий выбор экскурсий, туров и приключений, которые позволят вам окунуться в историю и культуру разных регионов.
                    Наши маршруты охватывают самые интересные и уникальные исторические места, такие как древние города, замки, крепости, музеи, монастыри и многое другое.
                    Мы также предлагаем туры по заповедным местам, где вы сможете насладиться красотой природы, познакомиться с уникальными животными и растениями.
                    Мы гарантируем высокое качество обслуживания и индивидуальный подход к каждому клиенту. Наша команда готова помочь вам с выбором маршрута,
                    бронированием билетов и организацией проживания. Мы работаем только с проверенными партнерами и предоставляем только надежные услуги.
                    Если вы хотите отправиться в увлекательное путешествие по историческим местам или заповедным местам, свяжитесь с нами прямо сейчас.
                    Мы поможем вам выбрать идеальный маршрут и организуем незабываемое приключение!
                </Text>
            </Box>

            <Box
                mt={10}
                backgroundImage={'/img/AboutPage/facts.jpg'}
                color={'white'}
                pt={'80px'}
                pb={'80px'}
            >
                <HeadingForPage element={'h1'} content={'Интересные факты о нашем агентстве'} />
                <Flex
                    mt={20}
                    flexDirection={flexDirection}
                    alignItems={'center'}
                    justifyContent="space-evenly"
                    gap={property.gap}
                >
                    <FactForAboutPage picture={'/img/AboutPage/mountains-climbed.svg'} number={17} text={'Покоренные вершины'} />
                    <FactForAboutPage picture={'/img/AboutPage/islands-visited.svg'} number={213} text={'Исследованные острова'} />
                    <FactForAboutPage picture={'/img/AboutPage/photos-taken.svg'} number={11923} text={'Сделанные Фотографии'} />
                    <FactForAboutPage picture={'/img/AboutPage/cruises-organized.svg'} number={150} text={'Организовано туров'} />
                </Flex>
            </Box>

            <Box
                m={marginParameters}
            >
                <HeadingForPage element={'h1'} content={'Популярные услуги, которые мы предлагаем'} />
                <Flex
                    mt={10}
                    flexDirection={flexDirection}
                    alignItems={'flex-start'}
                    justifyContent={'center'}
                    gap={'10px'}

                >
                    <ServiceForAboutPage picture={{ pic: '/img/AboutPage/car.svg', hoverPic: '/img/AboutPage/green-car.svg' }} text={'Поездки на выходные'} />
                    <ServiceForAboutPage picture={{ pic: '/img/AboutPage/suitcase.svg', hoverPic: '/img/AboutPage/yellow-suitcase.svg' }} text={'Веселые поездки на отдых'} />
                    <ServiceForAboutPage picture={{ pic: '/img/AboutPage/plane.svg', hoverPic: '/img/AboutPage/blue-plane.svg' }} text={'Билеты на самолет'} />
                </Flex>
            </Box>

        </Box>
    </>
}