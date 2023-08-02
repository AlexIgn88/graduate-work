import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Flex, Button, useBreakpointValue } from '@chakra-ui/react';
import AccountIcon from '../components/AccountIcon';

export default function Login() {
    const { data: session } = useSession();

    const isWide = useBreakpointValue({ base: false, md: true });

    if (session)
        return <>
            <Box className='login-account-info'>

                <Flex
                    display={isWide ? "flex" : "none"}
                >
                    <AccountIcon />
                </Flex>

                <Button
                    title='Выйти из аккаунта'
                    backgroundColor={'#281c15'}
                    color={'white'}
                    p={'10px 20px'}
                    border='none'
                    borderRadius='50px'
                    _hover={{
                        backgroundColor: '#1a120e'
                    }}
                    _active={{
                        backgroundColor: 'black',
                        padding: '8px 18px',
                    }}

                    className='login-button'
                    onClick={() => signOut()}>Выйти</Button>

            </Box>
        </>;

    return <>
        <Box className='login-account-info'>
            <Button
                title='Войти в аккаунт'
                backgroundColor={'#281c15'}
                color={'white'}
                p={'10px 20px'}
                border='none'
                borderRadius='50px'
                _hover={{
                    backgroundColor: '#1a120e'
                }}
                _active={{
                    backgroundColor: 'black',
                    padding: '8px 18px',
                }}

                className='login-button'
                onClick={() => signIn()}>Войти</Button>
        </Box>
    </>;
}