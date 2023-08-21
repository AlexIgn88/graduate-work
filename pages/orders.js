import Head from "next/head";
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { halfMarginParameters } from '../displayParameters/marginParameters';
import OrdersComponent from '../components/OrdersComponent';


export default function OrdersPage() {

    const API_URL = '/api/store/order';

    return <>
        <Head>
            <title>Заказы</title>
        </Head>
        <Box
            className="orders-page"
            m={halfMarginParameters}
        >
            <GetData url={API_URL}>
                <OrdersComponent />
            </GetData>
        </Box>
    </>
}