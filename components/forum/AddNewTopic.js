import { Button, Input, Flex } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';


export default function AddNewTopic({ newTopicInputVal, setNewTopicInputVal, data, mutate, currentUserId, onClose }) {


    const newTopic = {
        title: newTopicInputVal,
        content: '', //временная затычка
        userId: currentUserId
    };


    async function addTopic(newTopic) {
        try {
            mutate(changeDataAdd(newTopic));
            setNewTopicInputVal('');
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newTopic) {
        try {
            const response = await fetch('/api/forum/topic/', {
                method: 'POST',
                body: JSON.stringify(newTopic)
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
            <Input
                type='search'
                name='new-topic'
                placeholder={'Название темы'}
                value={newTopicInputVal}
                onInput={evt => setNewTopicInputVal(evt?.target?.value)}
                onKeyDown={(evt) =>
                    (evt.keyCode === 13)
                        ? addTopic(newTopic)
                        : null
                }
                fontSize={textFontSize}
                m={'10px'}
            />
            <Flex
                flexDirection={flexDirection}
                gap={'5vw'}

            >
                <Button
                    colorScheme='blue'
                    type='submit'
                    onClick={() => addTopic(newTopic)}>Добавить</Button>
                <Button colorScheme='blue' onClick={() => {
                    setNewTopicInputVal('');
                    onClose();
                }}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}