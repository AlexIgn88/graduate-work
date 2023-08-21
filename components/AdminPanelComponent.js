import columnsForAdminPanel from '../data/columnsForAdminPanel';
import { Flex, Grid, Skeleton, Stack, Input, Button } from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment, useState } from 'react';
import UserDataFragment from '../components/UserDataFragment';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';
import AddNewUser from '../components/AddNewUser';
import ErrorComponent from '../components/ErrorComponent';


export default function AdminPanelComponent({ data, mutate }) {

    // console.log('data', data);

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: '', colomn: '', nameInBase: '' }),
        [filterValue, setFilter] = useState('');
    // [sortCol, setSortCol] = useState(false);

    const API = '/api/admin/';

    let viewData;
    viewData = data;

    // if (sortCol) sortArrayByName(viewData);

    if (filterValue) {
        viewData = viewData.filter(obj => columnsForAdminPanel
            .map(col => col.getVal(obj)?.toString().toLowerCase())
            .some(str => str?.includes(filterValue.toLowerCase())));
    }

    if (!data) return (
        <Stack>
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
        </Stack>)

    // if (data?.error) return <Flex justifyContent={'center'} color={'red'}>{data.error}</Flex>
    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        async function editData(id, updatedUser) {
            setInputVal('');
            setSelectedForEdit({ userId: '', colomn: '', nameInBase: '' });
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
                return data?.map(item =>
                    item.id === id ? Object.assign({}, item, updatedUser) : item)
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        async function delData(id) {
            try {
                mutate(changeDataDel(id));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            } finally {
                null;
            }
        }

        async function changeDataDel(id) {
            try {
                const response = await fetch(`/api/apiuser/user/${id}`, {
                    method: 'DELETE',
                });
                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);
                return data?.filter(item => id !== item?.id)
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        return <>
            <Flex flexDirection={{ base: 'column', lg: 'row' }} alignItems={'center'} gap={'40px'} mb={'20px'} >
                <ModalWindowBlur buttonText={'Создать нового пользователя'} buttonColorScheme={'gray'}>
                    <AddNewUser data={data} mutate={mutate} />
                </ModalWindowBlur>
                <Flex className='filter' alignItems={'center'} gap={'10px'}>
                    <span>Поиск:</span>
                    <Input
                        type="search"
                        value={filterValue}
                        placeholder='Укажите значение'
                        onInput={evt => setFilter(evt.target.value.trim())}
                    />
                </Flex>
                {/* <Button onClick={() => setSortCol(true)}>Сортировать по алфавиту</Button>
                <Button onClick={() => setSortCol(false)}>Сбросить сортировку</Button> */}
            </Flex>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    '2xl': "repeat(3, 1fr)",
                    xl: "repeat(2, 1fr)",
                    lg: "repeat(1, 1fr)",
                    md: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)"
                }}
                gap={5}
                borderRadius={'5px'}
            >
                {viewData?.map(user => (
                    <Fragment key={user.id}>
                        <UserDataFragment
                            columns={columnsForAdminPanel}
                            data={user}
                            editData={editData}
                            delData={delData}
                            inputPlaceholder={'Напишите тут'}
                            inputVal={inputVal}
                            setInputVal={setInputVal}
                            selectedForEdit={selectedForEdit}
                            setSelectedForEdit={setSelectedForEdit}
                            API={API}
                        />
                    </Fragment>
                ))}
            </Grid>
            {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        </>
    }
}


// function sortArrayByName(array) {
//     array.sort((a, b) => {
//         const nameA = a.name.toLowerCase();
//         const nameB = b.name.toLowerCase();

//         if (nameA < nameB) {
//             return -1;
//         }
//         if (nameA > nameB) {
//             return 1;
//         }
//         return 0;
//     });

//     return array;
// }