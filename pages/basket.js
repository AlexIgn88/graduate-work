import Head from "next/head";
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters } from '../displayParameters/marginParameters';
import BasketComponent from '../components/BasketComponent';


export default function BasketPage() {

    const API_URL = '/api/store/basket';

    return <>
        <Head>
            <title>Корзина</title>
        </Head>
        <Box className="basket-page" m={marginParameters}>
            <GetData url={API_URL}>
                <BasketComponent />
            </GetData>
        </Box>
    </>
}