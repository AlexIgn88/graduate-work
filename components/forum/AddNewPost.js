import { Button, Flex, Textarea } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import { useCallback, memo } from 'react';
import AutoResizableTextarea from '../../components/AutoResizableTextarea';

export default function AddNewPost({ newPostInputVal, setNewPostInputVal, data, mutate, currentUserId, topicId, onClose }) {

    async function addPost() {
        try {
            const formData = {
                content: newPostInputVal,
                // createdAt: null, //временная затычка
                // updatedAt: null, //временная затычка
                userId: currentUserId,
                topicId: +topicId
            };

            mutate(changeDataAdd(formData));
            setNewPostInputVal('');
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newPostObject) {
        try {
            const response = await fetch('/api/forum/post/', {
                method: 'POST',
                body: JSON.stringify(newPostObject)
            });
            // console.log('adduser response', response);
            if (!response.ok) throw new Error('ошибка');
            const json = await response.json();
            // console.log('json', json);
            return {
                ...data, posts: [...data?.posts, json]
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        }
    }

    const handleTextareaChange = useCallback((evt) => {
        let textareaValue = evt?.target?.value
        setNewPostInputVal(textareaValue)
    }, []);


    return <>
        <Flex
            flexDirection={'column'}
            alignItems={'baseline'}
        >

            <AutoResizableTextarea
                margin={'10px'}
                fontSize={textFontSize}
                name={'new-post'}
                placeholder={'Ваше сообщение'}
                onInput={handleTextareaChange}
                onKeyDown={(evt) =>
                    (evt.keyCode === 13)
                        ? addPost()
                        : null
                }

            />

            <Flex
                flexDirection={flexDirection}
                gap={'15px'}

            >
                <Button
                    colorScheme='orange'
                    type='submit'
                    onClick={() => addPost()}>Добавить</Button>
                <Button colorScheme='orange' onClick={() => {
                    setNewPostInputVal('');
                    onClose();
                }}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}
