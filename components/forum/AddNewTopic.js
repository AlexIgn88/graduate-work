import { Button, ButtonGroup, Input } from '@chakra-ui/react';

export default function AddNewTopic({ newTopicInputVal, setNewTopicInputVal, mutate, currentUserId }) {

    // console.log('mutate', mutate);

    return <>
        <div>
            <Input
                type='search'
                name='new-topic'
                placeholder={'Название новой темы'}
                value={newTopicInputVal}
                onInput={evt => setNewTopicInputVal(evt.target.value)}
            />
            <Button colorScheme='yellow' type='submit' onClick={async () => {

                // console.log('button');

                async function addTopic(formData) {
                    try {
                        const response = await fetch('/api/forum/topic/', {
                            method: 'POST',
                            body: JSON.stringify(formData)
                        });
                        console.log('adduser response', response);
                        if (!response.ok) throw new Error('не ок');
                        const json = await response.json();
                        console.log('json', json);
                        return {
                            ...data, topics: [...data.topics, json]
                        }
                    } catch (error) {
                        null;
                    }
                }
                try {
                    const formData = {
                        title: newTopicInputVal,
                        content: 'описание темы', //временная затычка
                        createdAt: null, //временная затычка
                        updatedAt: null, //временная затычка
                        userId: currentUserId
                    };
                    mutate(addTopic(formData));
                    setNewTopicInputVal('');
                } catch (error) {
                    console.log(`FILE: ${__filename}\nERROR:`, error);
                } finally {
                    null;
                }
            }
            }>Добавить тему</Button>
        </div>
    </>
}