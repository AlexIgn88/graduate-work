import { Button, Input, Flex } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';

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

    const handleOnKeyDown = (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            addTopic();
        }
    };

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
                fontSize={textFontSize}
                m={'10px'}
                onKeyDown={(evt) => handleOnKeyDown(evt)}
            />
            <Flex
                flexDirection={flexDirection}
                gap={'15px'}

            >
                <Button
                    colorScheme='orange'
                    type='submit'
                    onClick={() => addTopic()}>Добавить тему</Button>
                <Button colorScheme='orange' onClick={onClose}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}