import GetData from '../../components/GetData';
import ForumComponent from '../../components/forum/ForumComponent';
import Head from "next/head";
import { Global } from '@emotion/react';
import darkGlobalStyles from '../../displayParameters/darkGlobalStyles';


export default function ForumPage() {

    const API_URL = '/api/forum/topic/';

    return <>
        <Head>
            <title>Форум</title>
        </Head>

        <Global styles={darkGlobalStyles} />

        <GetData url={API_URL}>
            <ForumComponent />
        </GetData>
    </>;
}