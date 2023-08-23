import { useRouter } from 'next/router';
import {
    Button, useBreakpointValue, useDisclosure,
    Drawer, DrawerBody, DrawerFooter, DrawerOverlay, DrawerContent, DrawerCloseButton,
} from '@chakra-ui/react';
import { FcMenu } from "react-icons/fc";
import { useRef } from 'react';
import NavbarListComponent from '../components/NavbarListComponent';


export default function Navbar() {

    const
        router = useRouter(),
        isWide = useBreakpointValue({ base: false, lg: true });

    let backgroundColor = '';
    let backgroundColorFocus = '';
    switch (true) {
        case '/places' === router.pathname:
            backgroundColor = 'rgb(6, 13, 32)';
            backgroundColorFocus = '#feb849';
            break;
        case 'forum' === router.pathname.split('/')[1]:
            backgroundColor = 'rgb(6, 13, 32)';
            backgroundColorFocus = '#feb849';
            break;
        default:
            backgroundColor = '#8d634b';
            backgroundColorFocus = '#feb849';
            break;
    }


    function DrawerMenu() {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = useRef()

        return (
            <>
                <Button
                    ref={btnRef}
                    onClick={onOpen}
                    title='Навигация сайта'
                    backgroundColor={'#feb849'}
                    color={'white'}
                    p={'10px 20px'}
                    border='none'
                    borderRadius='50px'
                    _hover={{
                        backgroundColor: 'white',
                        color: 'black',
                    }}
                    _active={{
                        backgroundColor: 'white',
                        color: '#feb849',
                    }}
                >
                    <FcMenu />
                </Button>

                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />

                        <DrawerBody
                            background={backgroundColor}
                        >
                            <NavbarListComponent
                                flexDirection={'column'}
                                backgroundColor={backgroundColor}
                                backgroundColorFocus={backgroundColorFocus}
                            />
                        </DrawerBody>

                        <DrawerFooter
                            background={backgroundColor}
                            justifyContent={'center'}
                        >
                            <Button
                                mr={3}
                                backgroundColor={'#feb849'}
                                color={'white'}
                                onClick={onClose}
                                _hover={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                                _active={{
                                    backgroundColor: 'white',
                                    color: '#feb849',
                                }}
                            >
                                Закрыть
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        )
    }


    return <>
        <nav>
            {!isWide && <DrawerMenu />}

            {isWide && <NavbarListComponent
                flexDirection={'row'}
                backgroundColor={backgroundColor}
                backgroundColorFocus={backgroundColorFocus}
            />}
        </nav>
    </>;
}
