import { Button, Input, Flex, Textarea } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import { flexDirection } from '../../displayParameters/flexParameters';
import { useCallback, memo } from 'react';
import handleOnKeyEnterDown from '../../includes/handleOnKeyEnterDown';

export default function AddNewPost({ newPostInputVal, setNewPostInputVal, data, mutate, currentUserId, topicId, onClose }) {

    async function addPost() {
        try {
            const formData = {
                content: newPostInputVal,
                createdAt: null, //временная затычка
                updatedAt: null, //временная затычка
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
                ...data, posts: [...data.posts, json]
            }
        } catch (error) {
            console.log(`FILE: ${__filename}\nERROR:`, error)
        }
    }

    // let handleTextareaChange = (evt) => {
    //     let textareaValue = evt.target.value
    //     setNewPostInputVal(textareaValue)
    // }

    const handleTextareaChange = useCallback((evt) => {
        let textareaValue = evt.target.value
        setNewPostInputVal(textareaValue)
    }, []);


    return <>
        <Flex
            flexDirection={'column'}
            alignItems={'baseline'}
        >

            {/* <Textarea
                name='new-post'
                fontSize={textFontSize}
                m={'10px'}
                onKeyDown={(evt) => handleOnKeyDown(evt)}

                value={newPostInputVal}
                onChange={handleTextareaChange}
                placeholder={'Ваше сообщение'}
                size='sm'
            /> */}

            <TextareaComponent
                value={newPostInputVal}
                onChange={handleTextareaChange}
                onKeyDown={(evt) => handleOnKeyEnterDown(evt, addPost)}
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

const TextareaComponent = memo((props) => {

    const { value, onChange, onKeyDown } = props;

    return <Textarea
        name='new-post'
        placeholder={'Ваше сообщение'}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        fontSize={textFontSize}
        m={'10px'}
        size='sm'
    />;

});