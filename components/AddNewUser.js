import { Button, Input, Flex } from '@chakra-ui/react';
import { flexDirection } from '../displayParameters/flexParameters';
import columnsForAdminPanel from '../data/columnsForAdminPanel';
import UserDataFragment from '../components/UserDataFragment';
import { useState } from 'react';


export default function AddNewUser({ data, mutate, onClose }) {

    const columnsForNewUser = columnsForAdminPanel.filter(item => 'actions' !== item?.nameInBase && 'image' !== item?.nameInBase);

    const arrOfNameInBase = columnsForNewUser.map(column => column.nameInBase);

    const defaultUser = arraysToObject(arrOfNameInBase, Array(columnsForNewUser.length).fill(''));

    // console.log('newUser2', defaultUser);

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: '', colomn: '', nameInBase: '' });

    const [newUser, setNewUser] = useState(defaultUser);

    // console.log('user', newUser);

    function editData(id, obj) {
        setInputVal('');
        setSelectedForEdit({ userId: '', colomn: '', nameInBase: '' });
        return setNewUser(Object.assign(newUser, obj));
    }


    async function addData(newUser) {
        try {
            mutate(changeDataAdd(newUser));
            setNewUser({});
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newUser) {
        try {
            const response = await fetch('/api/apiuser/user/', {
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

function arraysToObject(keys, values) {
    const obj = {};

    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = values[i];
    }

    return obj;
}