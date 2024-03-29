import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import UserAccountComponent from '../components/UserAccountComponent';
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';


export default function MyAccount() {

    const API_URL = '/api/apiuser/user';

    const newMarginParameters = Object.assign({}, marginParameters, { base: '5px' });

    return <>
        <Head>
            <title>Мой аккаунт</title>
        </Head>
        <Box
            className='account-page'
            m={newMarginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >
            <SWRConfig>
                <GetData url={API_URL}>
                    <UserAccountComponent />
                </GetData>
            </SWRConfig>
        </Box>
    </>
}