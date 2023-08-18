import { SWRConfig } from 'swr';
import GetData from '../components/GetData';
import AdminPanelComponent from '../components/AdminPanelComponent';

import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';


export default function AdminPanelPage() {

  const API_URL = '/api/admin/user/';

  const newMarginParameters = Object.assign({}, marginParameters, { base: '5px' }, { sm: '5px' }, { '2xl': '10px' });

  return <>
    <Head>
      <title>Админ-панель</title>
    </Head>
    <Box
      className='admin-page'
      m={newMarginParameters}
      mt={halfMarginParameters}
      mb={halfMarginParameters}
    >
      <SWRConfig>
        <GetData url={API_URL}>
          <AdminPanelComponent />
        </GetData>
      </SWRConfig>
    </Box>
  </>
}