import columnsForAdminPanel from '../data/columnsForAdminPanel';
import {
    Box, Flex, Button, Input, chakra, Grid,
    Skeleton, Stack,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment, useState } from 'react';
import { textFontSize } from '../displayParameters/fontParameters';
import UserDataFragment from '../components/UserDataFragment';


export default function AdminPanelComponent({ data, mutate }) {

    // console.log('data', data);

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: null, colomn: null, nameInBase: null });

    if (!data) return (
        <Stack>
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
        </Stack>)

    if (data?.error) return <Flex justifyContent={'center'} color={'red'}>{data.error}</Flex>

    if (data && (!data?.error)) {

        async function editData(id, newObject) {
            const updatedUser = Object.assign({}, newObject);
            setInputVal('');
            setSelectedForEdit(null);
            // console.log('updatedUser=', updatedUser);
            try {
                mutate(changeDataEdit(updatedUser, id));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            } finally {
                null;
            }
        }

        async function changeDataEdit(updatedUser, id) {
            try {
                const response = await fetch(`/api/apiuser/user/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updatedUser)
                });
                // console.log('changeDataEdit response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);
                return data?.map(item =>
                    item.id === id ? Object.assign({}, item, updatedUser) : item)
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        return <>
            <Grid
                templateColumns={{ base: "repeat(1, 1fr)", '2xl': "repeat(3, 1fr)", xl: "repeat(2, 1fr)", lg: "repeat(1, 1fr)", md: "repeat(1, 1fr)", sm: "repeat(1, 1fr)" }}
                gap={5}
                borderRadius={'5px'}
            >
                {data?.map(user => (
                    <Fragment key={user.id}>
                        <UserDataFragment
                            columns={columnsForAdminPanel}
                            data={user}
                            editData={editData}
                            inputPlaceholder={'Напишите тут'}
                            inputVal={inputVal}
                            setInputVal={setInputVal}
                            selectedForEdit={selectedForEdit}
                            setSelectedForEdit={setSelectedForEdit}
                        />
                    </Fragment>
                ))}
            </Grid>




            {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        </>
    }
}