import Head from "next/head";
import ContactInfo from '../components/ContactInfo';
import { Text, Button, Flex, Divider } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';


export default function ContactsPage() {

    return <>
        <Head>
            <title>Контакты</title>
        </Head>
        <Flex
            className="contacts-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'80px'}
        >
            <HeadingForPage element={'h1'} content={'Наши контакты'} />
            <Text >Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</Text>
            <ContactInfo />
            <Divider />
            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={'20px'}>
                <Button colorScheme='facebook'>Вконтакте</Button>
                <Button colorScheme='telegram'>Telegram</Button>
                <Button colorScheme='whatsapp'>Whatsapp</Button>
            </Flex>
        </Flex>
    </>
}