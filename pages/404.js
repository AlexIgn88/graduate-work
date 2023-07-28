import Head from "next/head";
import { HeadingForPage } from '../components/ElemsForPages';
import { Box } from "@chakra-ui/react";
import { marginParameters } from '../displayParameters/marginParameters';

export default function ErrorPage() {
    return <>
        <Head>
            <title>Страница не найдена</title>
        </Head>
        <Box m={marginParameters} className="error-page">
            <HeadingForPage element={'h1'} content={'Страница не найдена'} />
        </Box>
    </>
}