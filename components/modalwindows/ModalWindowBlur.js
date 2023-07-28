import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button,
} from '@chakra-ui/react';
import { useState, cloneElement } from 'react';

export default function ModalWindowBlur({ children }) {
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
            <Button colorScheme='orange'
                onClick={() => {
                    setOverlay(<Overlay />)
                    onOpen()
                }}
            >
                Создать новую тему
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