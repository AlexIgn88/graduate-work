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

    //в childComponentWithProps встроены временные затычки до установки статических пропсов
    //может мне попробовать скелетон потом?
    //Skeleton is used to display the loading state of some component.
    //https://chakra-ui.com/docs/components/skeleton
    return <>
        {/* {isLoading && <div className='spinner'>loading....</div>} */}
        {error && <div>Error {error.toString()}</div>}
        {/* {data && childComponentWithProps} */}
        {childComponentWithProps}
        {/* data= {data && <pre>{JSON.stringify(data, null, '\t')}</pre>} */}
    </>;
}