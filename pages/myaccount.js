import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import UserAccount from '../components/UserAccount';
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
                        <UserAccount />
                    </GetData>
                </SWRConfig>
        </Box>
    </>
}