import Head from "next/head";
import { nanoquery } from '@nanostores/query';
import { useStore } from '@nanostores/react';

// import EditableTable from '../components/EditableTable';
// import { columns } from '../datatypes/users';

const
  [createFetcherStore] = nanoquery(
    { fetcher: (...keys) => fetch(keys.join('')).then(r => r.json()), }),
  $users = createFetcherStore(['/api/admin/users']);

export default function AdminPanel() {
  const
    { data: rows, loading, error } = useStore($users);

  const storeHookResult = useStore($users);
  console.log('storeHookResult=', storeHookResult);

  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <div className="page admin-page">
      <h1>admin</h1>
      {/* {Array.isArray(rows) && <EditableTable {...{ columns, rows }} />} */}

      <div className='user-accout'>
        {/* <button onClick={() => signIn()}>Добавить аккаунт</button> */}
        {/* <h3>frontend:</h3>
        <pre>{JSON.stringify(sessionHookResult, null, '\t')}</pre> */}
        <h3>backend:</h3>
        <pre>{JSON.stringify(storeHookResult, null, '\t')}</pre>
      </div>
    </div>
  </>;
}