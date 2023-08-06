import { Button, Flex, Textarea } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import { useCallback, memo } from 'react';
import AutoResizableTextarea from '../../components/AutoResizableTextarea';

export default function AddNewPost({ newPostInputVal, setNewPostInputVal, data, mutate, currentUserId, topicId, onClose }) {

    const newPost = {
        content: newPostInputVal,
        userId: currentUserId,
        topicId: +topicId
    };

    async function addPost(newPost) {
        try {
            mutate(changeDataAdd(newPost));
            setNewPostInputVal('');
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error);
        } finally {
            onClose();
        }
    }

    async function changeDataAdd(newPost) {
        try {
            const response = await fetch('/api/forum/post/', {
                method: 'POST',
                body: JSON.stringify(newPost)
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
            alignItems={'center'}
            gap={'15px'}
        >

            <AutoResizableTextarea
                margin={'10px'}
                fontSize={textFontSize}
                name={'new-post'}
                placeholder={'Ваше сообщение'}
                onInput={handleTextareaChange}
                onKeyDown={(evt) =>
                    (evt.keyCode === 13)
                        ? addPost(newPost)
                        : null
                }

            />

            <Flex
                flexDirection={flexDirection}
                gap={'5vw'}

            >
                <Button
                    colorScheme='blue'
                    type='submit'
                    onClick={() => addPost(newPost)}>Добавить</Button>
                <Button colorScheme='blue' onClick={() => {
                    setNewPostInputVal('');
                    onClose();
                }}>Отмена</Button>
            </Flex>
        </Flex>
    </>
}
