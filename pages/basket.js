import Head from "next/head";
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import BasketComponent from '../components/BasketComponent';
import { Global } from '@emotion/react';


export default function BasketPage() {

    const API_URL = '/api/store/basket';

    return <>
        <Head>
            <title>Корзина</title>
        </Head>
        <Global styles={{
            'main': {
                background: 'linear-gradient(white, #fbfbac)',
            },
        }} />
        <Box
            className="basket-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <GetData url={API_URL}>
                <BasketComponent />
            </GetData>
        </Box>
    </>
}