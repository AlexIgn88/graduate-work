import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { textFontSize, h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize } from '../includes/fontDisplayParameters';

export function HeadingForPage({ element, content }) {

    let size;

    switch (element) {
        case 'h1':
            size = h1HeadersFontSize;
            break;
        case 'h2':
            size = h2HeadersFontSize;
            break;
        case 'h3':
            size = h3HeadersFontSize;
            break;
        default:
            size = h2HeadersFontSize;
            break;
    }

    return <Heading
        fontWeight={"normal"}
        textAlign={"center"}
        mb={10}

        as={element}
        fontSize={size}
    >
        {content}
    </Heading>
}

