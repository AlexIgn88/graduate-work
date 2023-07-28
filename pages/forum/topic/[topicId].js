import { useRouter } from 'next/router'
import { SWRConfig } from 'swr';
import GetData from '../../../components/GetData';
import OneTopicComponent from '../../../components/forum/OneTopicComponent';

export default function TopicPage() {
    const
        { query } = useRouter(),
        { topicId } = query;

    const API_URL = `/api/forum/post/?topicId=${topicId}`;

    return <>
        {topicId && <SWRConfig >
            <GetData url={API_URL}>
                <OneTopicComponent topicId={topicId} />
            </GetData>
        </SWRConfig>}
    </>
}