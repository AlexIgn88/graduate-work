import Head from "next/head";
import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { headersFontSize } from '../includes/displayParameters';


export default function AboutPage() {
    return <>
        <Head>
            <title>О нас</title>
        </Head>
        <div className="page about-page">

            <Box
                m={{ base: '5px', '2xl': '100px', xl: '80px', lg: '70px', md: '50px', sm: '30px' }}
            >

                <Box>
                    <Heading
                        as='h1'
                        fontSize={headersFontSize}
                        textAlign={"center"}
                        mb={10}
                        fontWeight={"normal"}
                    >
                        О компании
                    </Heading>
                    <Text
                        textAlign={'justify'}
                        fontFamily={'cursive'}
                    >
                        Мы - туристическое агентство "Исторические маршруты и заповедные места",
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
                // flexDirection="column"
                // alignItems="center"

                // alignContent="space-around"
                >
                    <Heading
                        fontSize={headersFontSize}
                        textAlign={"center"}
                        fontWeight={"normal"}
                    >
                        Факты о нашем агентстве
                    </Heading>
                    <Flex
                        mt={10}
                        flexDirection={{ base: 'column', lg: 'row' }}
                        // alignItems={{ base: 'center', lg: 'normal' }}
                        alignItems={'center'}
                        justifyContent="space-evenly"
                        gap={{ base: '30px', lg: '70px' }}
                    >
                        <Flex flexDirection="column" gap={{ base: '30px', lg: '50px' }}>
                            <div>КАРТИНКА</div>
                            <div>ЦИФРА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                        <Flex flexDirection="column" gap={{ base: '30px', lg: '50px' }}>
                            <div>КАРТИНКА</div>
                            <div>ЦИФРА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                        <Flex flexDirection="column" gap={{ base: '30px', lg: '50px' }}>
                            <div>КАРТИНКА</div>
                            <div>ЦИФРА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                        <Flex flexDirection="column" gap={{ base: '30px', lg: '50px' }}>
                            <div>КАРТИНКА</div>
                            <div>ЦИФРА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                    </Flex>
                </Box>

                <Box
                    mt={10}
                // flexDirection="column"
                // alignItems="center"
                >
                    <Heading
                        fontSize={headersFontSize}
                        textAlign={"center"}
                        fontWeight={"normal"}
                    >
                        Популярные услуги, которые мы предлагаем
                    </Heading>
                    <Flex
                        mt={10}
                        // flexDirection="row"
                        flexDirection={{ base: 'column', lg: 'row' }}
                        // alignItems={{ base: 'center', lg: 'normal' }}
                        alignItems={'center'}

                        justifyContent="center"
                        gap={{ base: '30px', lg: '70px' }}
                    >
                        <Flex flexDirection="column">
                            <Flex
                                flexDirection="row"
                                gap={{ base: '30px', lg: '50px' }}
                            >
                                <div>КАРТИНКА</div>
                                <div>ТЕКСТ</div>
                            </Flex>
                        </Flex>
                        <Flex
                            flexDirection="row"
                            gap={{ base: '30px', lg: '50px' }}
                        >
                            <div>КАРТИНКА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                        <Flex
                            flexDirection="row"
                            gap={{ base: '30px', lg: '50px' }}
                        >
                            <div>КАРТИНКА</div>
                            <div>ТЕКСТ</div>
                        </Flex>
                    </Flex>
                </Box>

            </Box>


        </div >
    </>
}