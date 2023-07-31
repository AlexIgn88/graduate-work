import Navbar from '../components/Navbar.js';
import Login from '../components/Login.js';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import AccountIcon from '../components/AccountIcon';

export default function Header({ color }) {

    const isWide = useBreakpointValue({ base: false, md: true });

    return <>
        <header className={color ? color + ' header' : 'header'} style={{ zIndex: '3', display: 'flex', alignItems: 'center' }} >

            <Flex
                display={isWide ? "none" : "flex"}
                ml={'20px'}
            >
                <AccountIcon />
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