import { Button } from '@chakra-ui/react';
import {
    VKShareButton,
    VKShareCount,
} from "react-share";
import { FcLike } from "react-icons/fc";

export default function ShareButton({ type, shareUrl }) {

    switch (type) {
        case 'vk': return <ChakraVKShareButton shareUrl={shareUrl} />;
        default: return <button>Вы не указали type кнопки</button>;
    }
}

function ChakraVKShareButton({ shareUrl }) {
    return (
        <Button
            className="share-button"
            colorScheme='facebook'
            as={'div'}
        >
            <VKShareButton
                className="vk-button"
                url={shareUrl}
            >Поделиться в VK
                <FcLike />
                <VKShareCount url={shareUrl} />
            </VKShareButton>
        </Button>)
}