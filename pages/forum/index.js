import { SWRConfig } from 'swr';
import GetData from '../../components/GetData';
import ForumComponent from '../../components/ForumComponent';
import Head from "next/head";

export default function ForumPage() {

    const API_URL = '/api/forum/topic/';

    return <>
        <Head>
            <title>Форум</title>
        </Head>
        <SWRConfig >
            <GetData url={API_URL}>
                <ForumComponent />
            </GetData>
        </SWRConfig>
    </>;
}