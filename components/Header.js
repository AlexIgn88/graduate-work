import Navbar from '../components/Navbar.js';
import Login from '../components/Login.js';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import UserMenu from '../components/UserMenu';

export default function Header({ color }) {

    const isWide = useBreakpointValue({ base: false, md: true });

    return <>
        <header className={color ? color + ' main-header' : 'main-header'} style={{ zIndex: '3', display: 'flex', alignItems: 'center' }} >

            <Flex
                display={isWide ? "none" : "flex"}
                ml={'20px'}
                alignItems={'center'}
                cursor={'pointer'}
            >
                <UserMenu />
            </Flex>

            <Navbar />

            <Flex
                display={isWide ? "flex" : "none"}
            >
                <Login />
            </Flex>
        </header>
    </>
}