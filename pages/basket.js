import Head from "next/head";
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters } from '../displayParameters/marginParameters';
// import { flexDirection } from '../displayParameters/flexParameters';
// import { HeadingForPage } from '../components/ElemsForPages';
import BasketComponent from '../components/BasketComponent';
// import { useSession } from 'next-auth/react';


export default function BasketPage() {

    const API_URL = '/api/store/basket';

    // const
    //     { data: session } = useSession(),
    //     currentUserId = session?.user?.id;
    // currentUserName = session?.user?.name,
    // currentUserRole = session?.user?.role;

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