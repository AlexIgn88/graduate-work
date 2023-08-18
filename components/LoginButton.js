import { useSession, signIn, signOut } from 'next-auth/react';
import { Flex, Button, useBreakpointValue } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FcStart } from "react-icons/fc";


export default function LoginButton() {

    const
        isWide = useBreakpointValue({ base: false, md: true }),
        { data: session } = useSession();

    const handleActionLogin = useCallback(() => {

        if (session) return signOut();
        if (!session) return signIn();

    }, []);

    return <>
        <Flex
            className='login-account-info'
            flexDirection={'row'}
            alignItems={'center'}
        >
            <Button
                backgroundColor={'#feb849'}
                color={'white'}
                p={'10px 20px'}
                mr={'15px'}
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
                className='login-button'

                onClick={() => handleActionLogin()}
            >
                {session && <span>Выйти</span>}

                {!session &&
                    (!isWide
                        ? <FcStart />
                        : <span>Войти</span>

                    )
                }

            </Button>
        </Flex>
    </>
}

export function AddNewAccount() {

    return (
        <Button
            colorScheme='gray'
            mb={'2vw'}
            title='Добавить дополнительный аккаунт'
            textAlign={'center'}
            whiteSpace={'normal'}
            onClick={() => signIn()}
        >Добавить аккаунт
        </Button>
    )
}