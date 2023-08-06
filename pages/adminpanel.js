import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import AdminPanelComponent from '../components/AdminPanelComponent';

import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { marginParameters } from '../displayParameters/marginParameters';


export default function AdminPanelPage() {

  const API_URL = '/api/admin/user/';

  const newMarginParameters = Object.assign({}, marginParameters, { base: '5px' });

  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <Box
      className='admin-page'
      m={newMarginParameters}
      mt={{ base: '35px', sm: '35px' }}
    >
      <SWRConfig>
        <GetData url={API_URL}>
          <AdminPanelComponent />
        </GetData>
      </SWRConfig>
    </Box>
  </>
}