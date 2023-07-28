import { Text, Box, chakra } from '@chakra-ui/react';
import { Phone, Email } from '../includes/cell-wrappers';

export default function ContactInfo() {
    return <Box className="contact-info">
        <Text><chakra.span fontWeight={'bold'}>Адрес:</chakra.span> г. Москва, ул. Исторических маршрутов, д.1, офис 123</Text>
        <Text><chakra.span fontWeight={'bold'}>Телефон:</chakra.span> <chakra.span as='u'><Phone value={'+7 (495) 123-45-67'} /></chakra.span></Text>
        <Text><chakra.span fontWeight={'bold'}>Email:</chakra.span> <chakra.span as='u'><Email value={'info@historicalroutes.com'} /></chakra.span>  </Text>
    </Box>
}