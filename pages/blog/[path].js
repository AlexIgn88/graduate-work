import { useRouter } from 'next/router'

export default function place() {
    const { query } = useRouter();

    // console.log(useRouter());
    // console.log(query);

    return (
        <div>
            <h1>Статья из блога c path {query.path}</h1>
        </div>
    )
};