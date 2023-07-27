import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { h1HeadersFontSize } from '../displayParameters/fontDisplayParameters';
import { useState } from "react";

const picSize = '82px'; 

export function FactForAboutPage({ picture, number, text }) {
    return <Flex
        flexDirection="column"
        gap={{ base: '30px', lg: '50px' }}
        alignItems={'center'}
    >
        <Image src={picture} alt={'picture'} w={picSize} h={picSize} />
        <Box fontSize={h1HeadersFontSize}>{number}</Box>
        <Text>{text}</Text>
    </Flex>
}

export function ServiceForAboutPage({ picture, text }) {
    const { pic, hoverPic } = picture;
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const img = `url(${pic})`;
    const hoverImg = `url(${hoverPic})`;

    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box
                w={picSize}
                h={picSize}
                backgroundImage={isHovered ? hoverImg : img}
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                transition="background-image 0.3s ease"
            />
            <Text>{text}</Text>
        </Flex>
    );
}
