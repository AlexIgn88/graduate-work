import { useSession, signIn, signOut } from 'next-auth/react';
import { Flex, Button, useBreakpointValue } from '@chakra-ui/react';
import UserMenu from '../components/UserMenu';

export default function Login() {
    const { data: session } = useSession();

    const isWide = useBreakpointValue({ base: false, md: true });

    if (session)
        return <>
            <Flex
                className='login-account-info'
                m={'15px'}
                flexDirection={'row'}
                alignItems={'center'}
                cursor={'pointer'}
            >

                <Flex
                    display={isWide ? "flex" : "none"}
                    alignItems={'center'}
                >
                    <UserMenu />
                </Flex>

                <Button
                    // colorScheme='orange'
                    title='Выйти из аккаунта'
                    backgroundColor={'#281c15'}
                    color={'white'}
                    p={'10px 20px'}
                    ml={'15px'}
                    border='none'
                    borderRadius='50px'
                    _hover={{
                        backgroundColor: 'white',
                        color: 'black',
                    }}
                    _active={{
                        backgroundColor: 'white',
                        color: '#feb849',
                        // padding: '8px 18px',
                    }}

                    className='login-button'
                    onClick={() => signOut()}>Выйти</Button>

            </Flex>
        </>;

    return <>
        <Flex
            className='login-account-info'
            m={'15px'}
            flexDirection={'row'}
            alignItems={'center'}
        >
            <Button
                title='Войти в аккаунт'
                backgroundColor={'#281c15'}
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
                    // padding: '8px 18px',
                }}

                className='login-button'
                onClick={() => signIn()}>Войти</Button>
        </Flex>
    </>;
}