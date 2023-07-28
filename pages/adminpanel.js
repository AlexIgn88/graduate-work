import { useStore } from '@nanostores/react';
import getStores from '../store/generateStores';

import Head from "next/head";
import userColumns from '../data/usersColumnsForAdminPanel';
import EditableAdminpanel from '../components/EditableAdminpanel';


// в апи не id: +id 
          
const
  adminStores = getStores('/api/admin/user/');  

export default function AdminPanelPage() {

  const
    { fetcherStore, addStore, delStore, updateStore } = adminStores,
    { data, loading, error } = useStore(fetcherStore),
    { mutate: onAdd } = useStore(addStore),
    { mutate: onDelete } = useStore(delStore),
    { mutate: onEdit } = useStore(updateStore);
    

  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <div className="page admin-page">
      <h1>admin</h1>
      <div className="">
        <h2>Админка</h2>
        {error && <>Error={error}</>}
        {loading && (!data) && <div className='spinner'></div>}
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
      </div>
    </div>
  </>

}