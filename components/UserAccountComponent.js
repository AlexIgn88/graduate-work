import columnsForUserAccount from '../data/columnsForUserAccount';
import {
    Box, Flex, Button, Input, chakra, Grid,
    Skeleton, Stack,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment, useState } from 'react';
import { textFontSize } from '../displayParameters/fontParameters';
import UserDataFragment from '../components/UserDataFragment';


export default function UserAccountComponent({ data, mutate }) {

    // console.log('data', data);

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: null, colomn: null, nameInBase: null });

    if (!data) return (
        <Stack>
            <Skeleton height='300px' />
        </Stack>)

    if (data?.error) return <Flex justifyContent={'center'} color={'red'}>{data.error}</Flex>

    if (data && (!data?.error)) {

        const { user, accouts } = data;

        const
            providersStr = accouts?.map(accouns => accouns?.provider).join(', '),
            emailStr = accouts?.map(accouns => accouns?.email).join(', '),
            userEmail = user?.email || emailStr;

        const formattedUser = Object.assign({}, user, { provider: providersStr }, { email: userEmail });

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
                return Object.assign({}, data, updatedUser);
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        return <>

            <Box>
                <Fragment key={user.id}>
                    <UserDataFragment
                        columns={columnsForUserAccount}
                        data={formattedUser}
                        editData={editData}
                        inputPlaceholder={'Напишите тут'}
                        inputVal={inputVal}
                        setInputVal={setInputVal}
                        selectedForEdit={selectedForEdit}
                        setSelectedForEdit={setSelectedForEdit}
                    />
                </Fragment>

                {/* <pre>{JSON.stringify(formattedUser, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(user, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(accouts, null, '\t')}</pre> */}
            </Box>
        </>
    }
}
