import { useStore } from '@nanostores/react';
import getStores from '../store/generateStores';

import { useSession, signIn, signOut } from 'next-auth/react';

import Head from "next/head";
import userColumns from '../data/usersColumnsForRersonalCabinet';
import accauntsColumns from '../data/usersColumnsForMyAccounts';
import EditableMyAccount from '../components/EditableMyAccount';
import {
  Box, Flex, Spacer, Heading, Button, ButtonGroup, Input,
  Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider,
  Skeleton, SkeletonCircle, SkeletonText, Stack
} from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';
import { marginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import { HeadingForPage } from '../components/ElemsForPages';

const
  userStores = getStores('/api/restricted/myaccount');


export default function MyAccount() {

  //перепишу на SWR, сделаю юзеру возможность редактированиясвоего никнейма - пока там ограничения на уровне API

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
    <Box
      className='account-page'
      m={marginParameters}
    >

      {/* {!session && <HeadingForPage element={'h1'} content={'Пожалуйста, залогинитесь на сайте для просмотра этой страницы '} />} */}

      {!session && <Stack m={marginParameters}>
        <Skeleton height='140px' />
        <Skeleton height='300px' />
        <Skeleton height='300px' />
      </Stack>}


      {session && <Box>


        <Box m={marginParameters}>
          <Menu>
            <MenuButton
              as={Button}
            // rightIcon={<ChevronDownIcon />}
            >
              Действия
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Button
                  as={'span'}
                  colorScheme='orange'
                  title='Добавить дополнительный аккаунт'
                  onClick={() => signIn()}
                >
                  Добавить аккаунт
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  as={'span'}
                  colorScheme='orange'
                  title='Выйти из аккаунта'
                  className='login-button'
                  onClick={() => signOut()}
                >
                  Выйти
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>


        {error && <>Error={error}</>}
        {loading && (!data) &&
          // <Box className='spinner'></Box>
          <Stack m={marginParameters}>
            <Skeleton height='300px' />
            <Skeleton height='300px' />
          </Stack>
        }

        <Box
          m={marginParameters}
        >
          {Array.isArray(user) && <EditableMyAccount
            columns={userColumns}
            data={user}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />}
        </Box>

        <Box
          m={marginParameters}
        >
          {Array.isArray(accouts) && <EditableMyAccount
            columns={accauntsColumns}
            data={accouts}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />}
        </Box>

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