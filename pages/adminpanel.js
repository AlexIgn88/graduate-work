import Head from "next/head";
// import { nanoquery } from '@nanostores/query';
// import { useStore } from '@nanostores/react';

/*
// import EditableTable from '../components/EditableTable';
// import { columns } from '../datatypes/users';
*/

import { useStore } from '@nanostores/react';
import getStores from '../store/generateStores';

import userColumns from '../includes/usersColumns'
import EditableAdminpanel from '../components/EditableAdminpanel';


// const
//   [createFetcherStore] = nanoquery(
//     { fetcher: (...keys) => fetch(keys.join('')).then(r => r.json()), }),
//   $users = createFetcherStore(['/api/admin/users']);

// export default function AdminPanel() {
//   const
//     { data: rows, loading, error } = useStore($users);

//   const storeHookResult = useStore($users);
//   console.log('storeHookResult=', storeHookResult);

//   return <>
//     <Head>
//       <title>Админ-панель</title>
//     </Head>
//     <div className="page admin-page">
//       <h1>admin</h1>
//       {/* {Array.isArray(rows) && <EditableTable {...{ columns, rows }} />} */}

//       <div className='user-accout'>
//         {/* <button onClick={() => signIn()}>Добавить аккаунт</button> */}
//         {/* <h3>frontend:</h3>
//         <pre>{JSON.stringify(sessionHookResult, null, '\t')}</pre> */}
//         <h3>backend:</h3>
//         <pre>{JSON.stringify(storeHookResult, null, '\t')}</pre>
//       </div>
//     </div>
//   </>;
// }


// const
//   adminStores = getStores('/api/admin/users');

// слеш / блин забыл!!! еще в апи не id: +id а так id: id нужно
                
const
  adminStores = getStores('/api/admin/user/');  

// const
//   adminStores = getStores('/api/public/user');



export default function AdminPanelPage() {

  const
    { fetcherStore, addStore, delStore, updateStore } = adminStores,
    { data, loading, error } = useStore(fetcherStore),
    { mutate: onAdd } = useStore(addStore),
    { mutate: onDelete } = useStore(delStore),
    { mutate: onEdit } = useStore(updateStore);


/*
  // if (error) return <>Error={error}</>;
  // if (data) return <div>Это - из базы:
  //   {data && <pre>{JSON.stringify(data, null, '\t')}</pre>}
  // </div>

  // <EditableComponent
  //   columns={columns}
  //   data={data}
  //   onAdd={onAdd}
  //   onDelete={onDelete}
  //   onEdit={onEdit}
  // />;

  // if (loading) return <div className='spinner'></div>;
  */



  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <div className="page admin-page">
      <h1>admin</h1>
      <div className="topics">
        <h2>Админка</h2>
        {error && <>Error={error}</>}
        {Array.isArray(data) && <div className="all-users">

          <EditableAdminpanel
            columns={userColumns}
            data={data}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />

          {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}

        </div>}
        {loading && <div className='spinner'>СПИНЕР ОТКЛЮЧЕН В CSS</div>}
      </div>
    </div>
  </>

}