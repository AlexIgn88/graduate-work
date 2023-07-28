import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { textFontSize } from '../../displayParameters/fontParameters';
import ContactInfo from '../../components/ContactInfo';

export function ModalWindowRecordingForATour() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button variant='solid' colorScheme='blue' onClick={onOpen}>Записаться</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontSize={textFontSize}>
                    <ModalHeader fontSize={textFontSize}>Для заказа тура или экскурсии свяжитесь, пожалуйста с нашим менеджером</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Lorem count={2} /> */}
                        <ContactInfo />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Закрыть
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}