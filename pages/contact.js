import Head from "next/head";
import ContactInfo from '../components/ContactInfo';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { marginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';


export default function ContactsPage() {

    return <>
        <Head>
            <title>Контакты</title>
        </Head>
        <Flex m={marginParameters} flexDirection={'column'} alignItems={'center'} gap={'80px'} className="contacts-page">
            <HeadingForPage element={'h1'} content={'Наши контакты'} />
            <Text >Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</Text>
            <ContactInfo />
            <Flex flexDirection={{ base: 'column', md: 'row' }} gap={'20px'}>
                <Button colorScheme='facebook'>Вконтакте</Button>
                <Button colorScheme='telegram'>Telegram</Button>
                <Button colorScheme='whatsapp'>Whatsapp</Button>
            </Flex>
        </Flex>
    </>
}