import { useRef } from 'react';
import { Textarea } from '@chakra-ui/react';

export default function AutoResizableTextarea({ margin, fontSize, name, placeholder, value, onInput, onKeyDown }) {
    const textareaRef = useRef(null);

    const handleTextareaChange = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';  // Сбросил высоту до автоматической высоты
        textarea.style.height = `${textarea.scrollHeight}px`;  // Установил высоту, основанную на содержимом
    };

    return (
        <Textarea
            ref={textareaRef}
            onChange={handleTextareaChange}
            rows={1}  // Исходное значение, чтобы текстареа автоматически не растягивалась по высоте
            width={'100%'}
            m={margin}
            fontSize={fontSize}
            name={name}
            placeholder={placeholder}
            value={value}
            onInput={onInput}
            onKeyDown={onKeyDown}
        />
    );
}
