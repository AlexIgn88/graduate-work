import Head from 'next/head';
import NextLink from 'next/link';
import { Fragment } from 'react';
import { places, loremIpsum } from '../data/placesData';
import { Box, Flex, useBreakpointValue, Image, Link } from "@chakra-ui/react";
import {textFontSize} from '../displayParameters/fontParameters';
import { marginParameters, marginParametersInArray } from '../displayParameters/marginParameters';
// import { flexDirection, flexDirectionInArray } from '../displayParameters/flexParameters';
import { Global } from '@emotion/react';
import darkGlobalStyles from '../displayParameters/darkGlobalStyles';
import { HeadingForPage } from '../components/ElemsForPages';

export default function PlacesPage() {

    const lastItemOfArray = marginParametersInArray.length - 1;
    const newBreakpointsInArray = [...marginParametersInArray.slice(0, lastItemOfArray), 60];

    const notWide = useBreakpointValue({ base: true, xl: false });

    return <>
        <Head>
            <title>Места</title>
        </Head>

        <Global styles={darkGlobalStyles} />

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
        <Box>
            <Link as={NextLink}
                href={href} className="one-card"
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                fontSize={'25px'}
            >
                <Image
                    className="card-img"
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
        <Box className="card-img" borderRadius={'10px'} width={'30vmax'} >
            < HeadingForPage element={'h1'} content={place.name} />
            <Box
                fontSize={textFontSize}
                fontFamily={'cursive'}
                mb={'30px'}
            >
                {place.text ? place.text : loremIpsum}
            </Box>
            <Box>
                <Link as={NextLink}
                    href={href}
                    className='link learn-more-button'
                    padding={'10px 20px'}
                    margin={'0px 0px'}
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
                        padding: '8px 18px',
                        margin: '2px 2px',
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

