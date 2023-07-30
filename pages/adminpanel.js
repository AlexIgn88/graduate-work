import { useStore } from '@nanostores/react';
import getStores from '../store/generateStores';

import { useSession, signIn } from 'next-auth/react';

import Head from "next/head";
import userColumns from '../data/usersColumnsForAdminPanel';
import EditableAdminpanel from '../components/EditableAdminpanel';
import { Box, Flex, Spacer, Heading, Button, ButtonGroup, Input } from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';
import { HeadingForPage } from '../components/ElemsForPages';

// import { SWRConfig } from 'swr';
// import GetData from '../components/GetData';
// import { useSession, signIn } from 'next-auth/react';

// import userColumns from '../data/usersColumnsForAdminPanel';
// import EditableAdminpanel from '../components/EditableAdminpanel';
// import Head from "next/head";
// import { Box, Flex, Spacer, Heading, Button, ButtonGroup, Input } from "@chakra-ui/react";
// import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';
// import { marginParameters } from '../displayParameters/marginParameters';
// import { flexDirection } from '../displayParameters/flexParameters';
// import { HeadingForPage } from '../components/ElemsForPages';


// в апи не id: +id 

const
  adminStores = getStores('/api/admin/user/');

export default function AdminPanelPage() {

  const
    { data: session } = useSession();

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
    <Box className="page admin-page">

      {!session && <HeadingForPage element={'h1'} content={'Для просмотра этой страницы необходимо быть админом'} />}
      {session && <Box>
        <HeadingForPage element={'h1'} content={'Админка'} />
        {error && <>Error={error}</>}
        {loading && (!data) && <Box className='spinner'></Box>}

        {Array.isArray(data) && <EditableAdminpanel
          columns={userColumns}
          data={data}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
        />}

        {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
      </Box>}


    </Box>
  </>

}

// export default function AdminPanelPage() {

//   const API_URL = '/api/admin/user/',
//     { data: session } = useSession();

//   return <>
//     <Head>
//       <title>Админ-панель</title>
//     </Head>
//     <Box m={marginParameters} className="admin-page">
//       {!session && <HeadingForPage element={'h1'} content={'Для просмотра этой страницы необходимо быть админом'} />}

//       {session && <>

//         <SWRConfig>
//           {/* <SWRConfig value={{ fallback }}> */}
//           <GetData url={API_URL}>
//             <EditableAdminpanel columns={userColumns} />
//           </GetData>
//         </SWRConfig>

//       </>




//       }
//     </Box>
//   </>
// }