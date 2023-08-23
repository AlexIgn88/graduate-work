import Head from "next/head";
import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import StoreComponent from '../components/StoreComponent';
import { useSession } from 'next-auth/react';


export default function StorePage() {

    const API_URL = '/api/store/product';

    const
        { data: session } = useSession(),
        currentUserName = session?.user?.name;

    return <>
        <Head>
            <title>Сувенирная лавка</title>
        </Head>
        <Box
            className="store-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >

            {session
                ? <HeadingForPage element={'h2'} content={`Добро пожаловать в нашу сувенирную лавку, ${currentUserName}!`} />
                : <HeadingForPage element={'h2'} content={'Добро пожаловать в нашу сувенирную лавку!'} />
            }

            <HeadingForPage element={'h1'} content={'Сувенирная лавка'} />

            <SWRConfig>
                {/* <SWRConfig value={{ fallback }}> */}
                <GetData url={API_URL}>
                    <StoreComponent />
                </GetData>
            </SWRConfig>
        </Box>
    </>
}

export async function getStaticProps() {
    return {
        props: {
            fallback: {
                '/api/store/product': fictionalDataForForum
            }
        }
    };
}