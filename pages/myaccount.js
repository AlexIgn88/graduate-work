import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import UserAccountComponent from '../components/UserAccountComponent';
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { marginParameters } from '../displayParameters/marginParameters';


export default function MyAccount() {

    const API_URL = '/api/apiuser/user';

    return <>
        <Head>
            <title>Мой аккаунт</title>
        </Head>
        <Box
            className='account-page'
            m={marginParameters}
        >
                <SWRConfig>
                    <GetData url={API_URL}>
                        <UserAccountComponent />
                    </GetData>
                </SWRConfig>
        </Box>
    </>
}