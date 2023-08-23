import Head from "next/head";
import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import { Box } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import StoreComponent from '../components/StoreComponent';
import { useSession } from 'next-auth/react';


export default function StorePage({ fallback }) {

    const API_URL = '/api/store/product';

    const
        { data: session } = useSession(),
        currentUserName = session?.user?.name;

    const { data } = fallback;

    // console.log('fallback=', fallback);

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

            {/* <SWRConfig> */}
            <SWRConfig value={data}>
                <GetData url={API_URL}>
                    <StoreComponent />
                </GetData>
            </SWRConfig>
        </Box >
    </>
}

export async function getStaticProps() {
    return {
        props: {
            fallback: {
                data: await getStaticData()
            }
        }
    };
}

const getStaticData = async () =>
    (await fetcher());

const fetcher = async () => await (await fetch('https://graduate-work-nu.vercel.app/api/store/product')).json();
