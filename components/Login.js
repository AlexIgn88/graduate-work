import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

import { Img, UnorderedList, ListItem, Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, chakra, Button, useBreakpointValue } from '@chakra-ui/react';

export default function Login() {
    const { data: session } = useSession();

    const isWide = useBreakpointValue({ base: false, sm: true });

    if (session)
        return <div className='login-account-info'>
            {session?.user?.image &&

                <Link href='/myaccount' className='' title='Мой аккаунт'>
                    <Img
                        src={session?.user?.image || ''}
                        alt="avatar"
                        className='login-avatar'
                        mr={{ base: '30px', '2xl': '0px', xl: '0px', lg: '0px', md: '0px', sm: '0px' }}
                    // ml={{ base: '0px', '2xl': '0px', xl: '0px', lg: '0px', md: '0px', sm: '0px' }}
                    />
                </Link>}

            <chakra.span className='login-username' display={isWide ? "block" : "none"}>
                <Link href='/myaccount' className='' title='Мой аккаунт'>{session?.user?.name}</Link>
            </chakra.span>


            <Button
                backgroundColor={'#281c15'}
                color={'white'}
                p={'10px 20px'} 
                border='none'
                _hover={{
                    backgroundColor: '#1a120e'
                }}
                _active={{
                    backgroundColor: 'black',
                    padding: '8px 18px',
                }}

                className='login-button'
                onClick={() => signOut()}>Выйти</Button>
        </div>;

    return <>
        <div className='login-account-info'>
            <Button
                backgroundColor={'#281c15'}
                color={'white'}
                p={'10px 20px'} 
                border='none'
                _hover={{
                    backgroundColor: '#1a120e'
                }}
                _active={{
                    backgroundColor: 'black',
                    padding: '8px 18px',
                }}

                className='login-button'
                onClick={() => signIn()}>Войти</Button>
        </div>
    </>;
}