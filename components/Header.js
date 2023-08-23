import Navbar from '../components/Navbar.js';
import Login from '../components/Login.js';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import UserMenu from '../components/UserMenu';
import LoginButton from '../components/LoginButton';
import { useSession } from 'next-auth/react';

export default function Header({ color }) {

    const
        isWide = useBreakpointValue({ base: false, md: true }),
        { data: session } = useSession();

    return <>
        <header
            className={color ? color + ' main-header' : 'main-header'}
            style={{
                zIndex: '3',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingLeft: '15px'
            }}
        >

            <Flex
                alignItems={'center'}
            >
                <Navbar />
                {!isWide &&

                    <Flex
                        display={"flex"}
                        ml={'20px'}
                        alignItems={'center'}
                        cursor={'pointer'}
                    >
                        <UserMenu />
                        {!session && <LoginButton />}
                    </Flex>}
            </Flex>

            {isWide && (
                <Flex
                    display={'flex'}
                >
                    <Login />
                </Flex>)}
        </header>
    </>
}