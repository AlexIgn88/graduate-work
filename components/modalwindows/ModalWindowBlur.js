import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button,
} from '@chakra-ui/react';
import { useState, cloneElement } from 'react';

export default function ModalWindowBlur({ onClick, buttonText, buttonColorScheme, width, children }) {
    const Overlay = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
        />
    )

    const
        { isOpen, onOpen, onClose } = useDisclosure(),
        [overlay, setOverlay] = useState(<Overlay />);

    const childComponentWithProps = cloneElement(children, { onClose });

    return (
        <>
            <Button
                width={width}
                colorScheme={buttonColorScheme}
                onClick={() => {
                    setOverlay(<Overlay />)
                    onOpen()
                    onClick && onClick()
                }}
            >
                {buttonText}
            </Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {childComponentWithProps}
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}