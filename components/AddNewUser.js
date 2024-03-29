import { Button, Flex } from '@chakra-ui/react';
import { flexDirection } from '../displayParameters/flexParameters';
import columnsForAdminPanel from '../data/columnsForAdminPanel';
import UserDataFragment from '../components/UserDataFragment';
import { useState } from 'react';
import arraysToObject from '../includes/arraysToObject';


export default function AddNewUser({ data, mutate, onClose }) {

    const columnsForNewUser = columnsForAdminPanel.filter(item => {
        switch (item?.nameInBase) {
            case 'actions':
            case 'additionalInformation':
            case 'image':
                return false;
            default:
                return true;
        }
    });

    const arrOfNameInBase = columnsForNewUser.map(column => column.nameInBase);

    const defaultUser = arraysToObject(arrOfNameInBase, Array(columnsForNewUser.length).fill(''));

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: '', colomn: '', nameInBase: '' });

    const [newUser, setNewUser] = useState(defaultUser);

    function editData(_, obj) {
        setInputVal('');
        setSelectedForEdit({ userId: '', colomn: '', nameInBase: '' });
        return setNewUser(Object.assign(newUser, obj));
    }


    async function addData(newUser) {
        try {
            mutate(changeDataAdd(newUser));
            setNewUser(defaultUser);
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newUser) {
        try {
            const response = await fetch('/api/admin/user/', {
                method: 'POST',
                body: JSON.stringify(newUser)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            return [...data, json]
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        }
    }

    return <>
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
        >

            <UserDataFragment
                columns={columnsForNewUser}
                data={newUser}
                editData={editData}
                inputPlaceholder={'Напишите тут'}
                inputVal={inputVal}
                setInputVal={setInputVal}
                selectedForEdit={selectedForEdit}
                setSelectedForEdit={setSelectedForEdit}
            />

            <Flex
                flexDirection={flexDirection}
                gap={'5vw'}

            >
                <Button
                    colorScheme='gray'
                    type='submit'
                    onClick={() => addData(newUser)}>Добавить</Button>

                <Button colorScheme='gray' onClick={() => {
                    setNewUser({});
                    onClose();
                }}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}
