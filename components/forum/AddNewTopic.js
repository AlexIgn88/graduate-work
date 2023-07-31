import { Button, Input, Flex } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import handleOnKeyEnterDown from '../../includes/handleOnKeyEnterDown';

export default function AddNewTopic({ newTopicInputVal, setNewTopicInputVal, data, mutate, currentUserId, onClose }) {

    async function addTopic() {
        try {
            const newTopic = {
                title: newTopicInputVal,
                content: '', //временная затычка
                createdAt: null, //временная затычка
                updatedAt: null, //временная затычка
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
                ...data, topics: [...data.topics, json]
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        }
    }

    return <>
        <Flex
            flexDirection={'column'}
            alignItems={'baseline'}
        >
            <Input
                type='search'
                name='new-topic'
                placeholder={'Название темы'}
                value={newTopicInputVal}
                onInput={evt => setNewTopicInputVal(evt.target.value)}
                onKeyDown={(evt) => handleOnKeyEnterDown(evt, addTopic)}
                fontSize={textFontSize}
                m={'10px'}
            />
            <Flex
                flexDirection={flexDirection}
                gap={'15px'}

            >
                <Button
                    colorScheme='orange'
                    type='submit'
                    onClick={() => addTopic()}>Добавить</Button>
                <Button colorScheme='orange' onClick={() => {
                    setNewTopicInputVal('');
                    onClose();
                }}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}