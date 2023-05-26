import { useRouter } from 'next/router'

export default function place() {
    const { query } = useRouter();

    // console.log(useRouter());
    // console.log(query);

    return (
        <div>
            <h1>Место c path {query.path}</h1>
        </div>
    )
};