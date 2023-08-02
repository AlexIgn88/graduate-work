import Head from 'next/head';
import NextLink from 'next/link';
import { Fragment } from 'react';
import { places, loremIpsum } from '../data/placesData';
import { Box, Flex, Heading, Text, useBreakpointValue, Image, Link } from "@chakra-ui/react";
import { textFontSize, h1HeadersFontSize } from '../displayParameters/fontParameters';
import { marginParameters, marginParametersInArray } from '../displayParameters/marginParameters';


export default function PlacesPage() {

    //Chakra UI: To make styles responsive, you can use either the array or object syntax.
    //https://chakra-ui.com/docs/styled-system/responsive-styles

    //marginParameters - данные для брейк-пойнтов в объекте формата { base: '20px', '2xl': '60px', xl: '50px', lg: '50px', md: '40px', sm: '30px' }
    //marginParametersInArray - массив строк формата ['30px', '60px'] для брейк-пойнтов со значением по возрастанию 

    const
        lastItemOfMarginArray = marginParametersInArray.length - 1,

        newBreakpointsInArray = [...marginParametersInArray.slice(0, lastItemOfMarginArray), 60], //60 в Chakra - это 240px

        notWide = useBreakpointValue({ base: true, xl: false });

    return <>
        <Head>
            <title>Места</title>
        </Head>

        <Box
            className="places-page"
            mt={marginParameters}
            mb={marginParameters}
            ml={newBreakpointsInArray}
            mr={newBreakpointsInArray}
        >
            <Flex
                className="cards"
                flexDirection={{ base: 'column', md: 'row' }}
                listStyleType={'none'}
                justifyContent={'space-evenly'}
                alignItems={'flex-start'}
                alignContent={'center'}
                flexWrap={'wrap'}
                gap={'2vw'}
            >

                {places.map((place, index) => {

                    const isEven = index % 2 === 0;
                    const href = `/places${place.path}`;

                    if (notWide) return (
                        <FlexWrap key={place.id}>
                            <CardsFragment key={place.id} place={place} href={href} notWide={notWide} />
                        </FlexWrap>)

                    if (!notWide) return <CardsFragment key={place.id} place={place} href={href} isEven={isEven} />
                })}

            </Flex >
        </Box >
    </>
}


function CardsFragment({ place, href, notWide, isEven }) {

    return <>
        {(notWide || isEven) && <ImageForCardsFragment place={place} href={href} />}

        <ContentForCardsFragment place={place} href={href} />

        {!notWide && !isEven && <ImageForCardsFragment place={place} href={href} />}
    </>
}

function ImageForCardsFragment({ place, href }) {

    return (
        <Box className="card-img">
            <Link as={NextLink}
                href={href} className="one-card"
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                fontSize={'25px'}
            >
                <Image
                    src={place.img ? place.img : '/img/favicon.png'}
                    alt={place.name}
                    borderRadius={'10px'}
                    width={'30vmax'}
                >
                </Image>
            </Link>
        </Box>)
}

function ContentForCardsFragment({ place, href }) {

    return (
        <Box className="card-content" borderRadius={'10px'} width={'30vmax'} >
            <Heading
                fontWeight={"normal"}
                textAlign={"center"}
                mt={{ base: '2vw', xl: '0vw' }}
                mb={'2vw'}
                ml={'10px'}
                as={'h1'}
                fontSize={h1HeadersFontSize}
            >
                {place.name}
            </Heading>


            <Box
                fontSize={textFontSize}
                fontFamily={'cursive'}
                mb={'30px'}
            >
                <Text textAlign={'justify'}>{place.text ? place.text : loremIpsum}</Text>
            </Box>
            <Box
                mb={'5px'}
            >
                <Link as={NextLink}
                    href={href}
                    className='link learn-more-button'
                    padding={'10px 20px'}
                    mt={'10px'}
                    ml={'2px'}
                    backgroundColor={'red'}
                    color={'white'}
                    border={'none'}
                    borderRadius={'50px'}
                    cursor={'pointer'}
                    _hover={{
                        backgroundColor: 'darkred'
                    }}
                    _active={{
                        backgroundColor: 'maroon',
                        padding: '6px 16px',
                        margin: '14px 6px',
                    }}
                >Узнать больше
                </Link>
            </Box>
        </Box >)
}

function FlexWrap({ children }) {
    return (
        <Fragment>
            <Flex>
                {children}
            </Flex>
        </Fragment>
    )
}

