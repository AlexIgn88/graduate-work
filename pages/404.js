import Head from "next/head";
import { HeadingForPage } from '../components/ElemsForPages';
import { Box } from "@chakra-ui/react";
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';

export default function ErrorPage() {
    return <>
        <Head>
            <title>Страница не найдена</title>
        </Head>
        <Box
            className="error-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <HeadingForPage element={'h1'} content={'Страница не найдена'} />
        </Box>
    </>
}