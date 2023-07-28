import { useStore } from '@nanostores/react';
import getStores from '../store/generateStores';

import { useSession, signIn } from 'next-auth/react';

import Head from "next/head";
import userColumns from '../data/usersColumnsForRersonalCabinet';
import accauntsColumns from '../data/usersColumnsForMyAccounts';
import EditableMyAccount from '../components/EditableMyAccount';
import { Box, Flex, Spacer, Heading, Button, ButtonGroup, Input } from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';
import { HeadingForPage } from '../components/ElemsForPages';

const
  userStores = getStores('/api/restricted/myaccount');

export default function MyAccount() {

  const
    { data: session } = useSession();

  const
    { fetcherStore, addStore, delStore, updateStore } = userStores,
    { data, loading, error } = useStore(fetcherStore),
    { mutate: onAdd } = useStore(addStore),
    { mutate: onDelete } = useStore(delStore),
    { mutate: onEdit } = useStore(updateStore);

  // const sessionHookResult = useSession();

  let user;
  let accouts;

  if (data) user = [data?.user];
  if (data) accouts = data?.accouts;

  return <>
    <Head>
      <title>Мой аккаунт</title>
    </Head>
    <Box className='page account-page'>

      {!session && <HeadingForPage element={'h1'} content={'Пожалуйста, залогинитесь на сайте для просмотра этой страницы '} />}
      {session && <Box>
        <Button colorScheme='yellow' onClick={() => signIn()}>Добавить аккаунт</Button>

        {error && <>Error={error}</>}
        {loading && (!data) && <Box className='spinner'></Box>}

        {Array.isArray(user) && <EditableMyAccount
          columns={userColumns}
          data={user}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
        />}

        {Array.isArray(accouts) && <EditableMyAccount
          columns={accauntsColumns}
          data={accouts}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
        />}

        {/* <Heading fontSize={h2HeadersFontSize}>frontend:</Heading>
        <pre>{JSON.stringify(sessionHookResult, null, '\t')}</pre> */}
        {/* <Heading fontSize={h1HeadersFontSize}>backend:</Heading>
        <Heading fontSize={h2HeadersFontSize}>data:</Heading> */}
        {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        {/* <pre>{JSON.stringify(user, null, '\t')}</pre> */}
        {/* <Heading fontSize={h2HeadersFontSize}>accouts:</Heading>
        <pre>{JSON.stringify(accouts, null, '\t')}</pre> */}

      </Box>}


    </Box>
  </>
}