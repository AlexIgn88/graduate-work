import { Button, Input, Flex } from '@chakra-ui/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import handleOnKeyEnterDown from '../includes/handleOnKeyEnterDown';

import columnsForAdminPanel from '../data/columnsForAdminPanel';
import UserDataFragment from '../components/UserDataFragment';
import { Fragment, useState } from 'react';


export default function AddNewUser({ onClose }) {

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState({ userId: null, colomn: null, nameInBase: null });

    const columns = columnsForAdminPanel.map(column => column.nameInBase);

    const columnsForNewUser = columns.slice(0, columns.length - 1);

    // console.log(columnsForNewUser);

    const newUser = arraysToObject(columnsForNewUser, Array(columnsForNewUser.length).fill(''));

    console.log('newUser', newUser);

    async function addTopic() {
        try {
            const newTopic = {
                title: newTopicInputVal,
                content: '', //временная затычка
                userId: currentUserId
            };
            mutate(changeDataAdd(newTopic));
            setNewTopicInputVal('');
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newTopicObject) {
        try {
            const response = await fetch('/api/forum/topic/', {
                method: 'POST',
                body: JSON.stringify(newTopicObject)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            return {
                ...data, topics: [...data?.topics, json]
            }
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
                columns={columnsForAdminPanel}
                data={newUser}
                editData={null}
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
                    onClick={() => null
                        // addTopic() 
                    }>Добавить</Button>

                <Button colorScheme='gray' onClick={() => {
                    // setNewTopicInputVal('');
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