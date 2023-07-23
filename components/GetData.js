import useSWR from 'swr';
import toast from 'react-hot-toast';
import { cloneElement } from 'react'

export default function GetData({ url, children }) {

    function toastFetcher() {
        const
            promise = fetch(url)
                .then(res => res.json());
        toast.promise(promise, {
            loading: 'Fetching...',
            success: 'ok!',
            error: (err) => `This just happened: ${err.toString()}`,
        });
        return promise;
    }

    const
        { data, error, isLoading, mutate } = useSWR((url), toastFetcher),

        childComponentWithProps = cloneElement(children, { data, mutate });

    return <>
        {/* {isLoading && <>loading....</>} */}
        {isLoading && <div className='spinner'>loading....</div>}
        {error && <div>Error {error.toString()}</div>}
        {data && childComponentWithProps}

        {/* data= {data && <pre>{JSON.stringify(data, null, '\t')}</pre>} */}
    </>;
}