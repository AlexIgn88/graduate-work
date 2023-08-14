import Head from "next/head";
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import StoreComponent from '../components/StoreComponent';
import { useSession } from 'next-auth/react';


export default function StorePage() {

    const API_URL = '/api/store/product';

    const
        { data: session } = useSession(),
        // currentUserId = session?.user?.id,
        currentUserName = session?.user?.name;
    // currentUserRole = session?.user?.role;

    return <>
        <Head>
            <title>Сувенирная лавка</title>
        </Head>
        <Box className="store-page" m={marginParameters}>

            {session
                ? <HeadingForPage element={'h2'} content={`Добро пожаловать в нашу сувенирную лавку, ${currentUserName}!`} />
                : <HeadingForPage element={'h2'} content={'Добро пожаловать в нашу сувенирную лавку!'} />
            }

            <HeadingForPage element={'h1'} content={'Сувенирная лавка'} />

            <GetData url={API_URL}>
                <StoreComponent />
            </GetData>
        </Box>
    </>
}