import columnsForUserAccount from '../data/columnsForUserAccount';
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { Fragment, useState } from 'react';
import UserDataFragment from '../components/UserDataFragment';
import ErrorComponent from '../components/ErrorComponent';


export default function UserAccountComponent({ data, mutate }) {

    // console.log('data', data);

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: '', colomn: '', nameInBase: '' });

    if (!data) return (
        <Stack>
            <Skeleton height='300px' />
        </Stack>)

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        const { user, accouts } = data;

        const
            providersStr = accouts?.map(accouns => accouns?.provider).join(', '),
            emailStr = accouts?.map(accouns => accouns?.email).join(', '),
            userEmail = user?.email || emailStr;

        const formattedUser = Object.assign({}, user, { provider: providersStr }, { email: userEmail });

        async function editData(id, updatedUser) {
            setInputVal('');
            setSelectedForEdit({ userId: null, colomn: null, nameInBase: null });
            // console.log('updatedUser=', updatedUser);
            try {
                mutate(changeDataEdit(id, updatedUser));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            } finally {
                null;
            }
        }

        async function changeDataEdit(id, updatedUser) {
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
            </Box>
        </>
    }
}
