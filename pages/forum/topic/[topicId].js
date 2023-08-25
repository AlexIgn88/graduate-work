import { useRouter } from 'next/router'
import GetData from '../../../components/GetData';
import OneTopicComponent from '../../../components/forum/OneTopicComponent';
import { Global } from '@emotion/react';
import darkGlobalStyles from '../../../displayParameters/darkGlobalStyles';

export default function TopicPage() {
    const
        { query } = useRouter(),
        { topicId } = query;

    const API_URL = `/api/forum/post/?topicId=${topicId}`;

    return <>
        <Global styles={darkGlobalStyles} />
        {topicId && (
            <GetData url={API_URL}>
                <OneTopicComponent topicId={topicId} />
            </GetData>)
        }
    </>
}