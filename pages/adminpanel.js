import { SWRConfig } from 'swr';
import GetData from '../components/GetData';

// import EditableAdminpanel from '../components/EditableAdminpanel';
import AdminPanelComponent from '../components/AdminPanelComponent';

import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { marginParameters } from '../displayParameters/marginParameters';


export default function AdminPanelPage() {

  const API_URL = '/api/admin/user/';

  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <Box
      className='admin-page'
      m={marginParameters}
    >
      <SWRConfig>
        <GetData url={API_URL}>

          {/* <EditableAdminpanel /> */}
          <AdminPanelComponent />

        </GetData>
      </SWRConfig>
    </Box>
  </>
}