import { Heading, Text, Box, Flex, Image, List, ListItem, ListIcon, chakra } from '@chakra-ui/react';
import { textFontSize, h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize } from '../displayParameters/fontDisplayParameters';
import { Phone, Email } from '../includes/cell-wrappers'

export function HeadingForPage({ element, content }) {

    let size;

    //если в компоненте чакры Heading не прописать значение as={ }, то создается h2
    //поэтому по умолчанию выставил шрифт для h2 default: size = h2HeadersFontSize;
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

export function ContactInfo() {
    return <Box className="contact-info">
        <Text><chakra.span fontWeight={'bold'}>Адрес:</chakra.span> г. Москва, ул. Исторических маршрутов, д.1, офис 123</Text>
        <Text><chakra.span fontWeight={'bold'}>Телефон:</chakra.span> <chakra.span as='u'><Phone value={'+7 (495) 123-45-67'} /></chakra.span></Text>
        <Text><chakra.span fontWeight={'bold'}>Email:</chakra.span> <chakra.span as='u'><Email value={'info@historicalroutes.com'} /></chakra.span>  </Text>
    </Box>
}