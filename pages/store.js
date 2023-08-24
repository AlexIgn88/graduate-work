import Head from "next/head";
import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import { Box, Flex } from '@chakra-ui/react';
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { HeadingForPage } from '../components/ElemsForPages';
import StoreComponent from '../components/StoreComponent';
import { useSession } from 'next-auth/react';
import { Global } from '@emotion/react';
import Image from 'next/image';


export default function StorePage({ fallback }) {

    const API_URL = '/api/store/product';

    const
        { data: session } = useSession(),
        currentUserName = session?.user?.name;

    // console.log('fallback=', fallback);

    return <>
        <Head>
            <title>Сувенирная лавка</title>
        </Head>
        <Global styles={{
            'main': {
                background: 'linear-gradient(white, #fbfbac)',
            },
        }} />
        <Box
            className="store-page"
            m={marginParameters}
            mt={halfMarginParameters}
            mb={halfMarginParameters}
        >

            <Flex justifyContent={'center'} mb={halfMarginParameters}>
                <Image
                    src={'/img/storelogo.jpg'}
                    alt={'store'}
                    height={200}
                    width={400}
                    priority={true}
                    style={{
                        borderRadius: '10px',
                        height: '200px',
                        width: '400px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </Flex>

            {session
                ? <HeadingForPage element={'h2'} content={`Добро пожаловать в нашу сувенирную лавку, ${currentUserName}!`} />
                : <HeadingForPage element={'h2'} content={'Добро пожаловать в нашу сувенирную лавку!'} />
            }

            {/* <SWRConfig > */}
            <SWRConfig value={{ fallback }}>
                <GetData url={API_URL}>
                    <StoreComponent />
                </GetData>
            </SWRConfig>
        </Box >
    </>
}

const API_URL = 'https://graduate-work-nu.vercel.app/api/store/product';

export async function getStaticProps() {
    return {
        props: {
            fallback: {
                [API_URL]: await getStaticData()
            }
        }
    };
}

const getStaticData = async () =>
    (await fetcher());

const fetcher = async () => await (await fetch(API_URL)).json();