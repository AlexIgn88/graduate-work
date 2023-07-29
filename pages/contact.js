import Head from "next/head";
import ContactInfo from '../components/ContactInfo';
import { Box } from '@chakra-ui/react';
import { marginParameters } from '../displayParameters/marginParameters';

export default function ContactsPage() {
    return <>
        <Head>
            <title>Контакты</title>
        </Head>

        <Box m={marginParameters} className=" contacts-page">
            <p>Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</p>
            <ContactInfo />
        </Box>
    </>
}