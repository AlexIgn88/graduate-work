import { Button, useBreakpointValue } from '@chakra-ui/react';
import {
    VKShareButton,
    VKShareCount,
    VKIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from "react-share";
import { FcLike } from "react-icons/fc";

export default function ShareButton({ type, shareUrl }) {

    const isWide = useBreakpointValue({ base: false, lg: true });

    switch (type.toLowerCase()) {
        case 'vk': return <ChakraVKShareButton shareUrl={shareUrl} isWide={isWide} />;
        case 'telegram': return <ChakraTelegramShareButton shareUrl={shareUrl} isWide={isWide} />;
        case 'whatsapp': return <ChakraWhatsappShareButton shareUrl={shareUrl} isWide={isWide} />;
        default: return <button>Вы не указали type кнопки</button>;
    }
}

function ChakraVKShareButton({ shareUrl, isWide }) {
    return (
        <Button
            className="chakra-share-button"
            colorScheme='facebook'
            as={'div'}
        >
            <VKShareButton
                className="share-button vk-button"
                url={shareUrl}
            >
                <VKIcon size={32} round={true} />
                {isWide && <span>Поделиться в VK</span>}
                <FcLike />
                <VKShareCount url={shareUrl} />
            </VKShareButton>
        </Button>)
}

function ChakraTelegramShareButton({ shareUrl, isWide }) {
    return (
        <Button
            className="chakra-share-button"
            colorScheme='telegram'
            as={'div'}
        >
            <TelegramShareButton
                className="share-button telegram-button"
                url={shareUrl}
            >
                <TelegramIcon size={32} round={true} />
                {isWide && <span>Поделиться в telegram</span>}
            </TelegramShareButton>
        </Button>)
}

function ChakraWhatsappShareButton({ shareUrl, isWide }) {
    return (
        <Button
            className="chakra-share-button"
            colorScheme='whatsapp'
            as={'div'}
        >
            <WhatsappShareButton
                className="share-button whatsapp-button"
                url={shareUrl}
            >
                <WhatsappIcon size={32} round={true} />
                {isWide && <span>Поделиться в Whatsapp</span>}
            </WhatsappShareButton>

        </Button>)
}