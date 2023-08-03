import { useSession } from 'next-auth/react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import UserMenu from '../components/UserMenu';
import LoginButton from '../components/LoginButton';

export default function Login() {
    const { data: session } = useSession();

    const isWide = useBreakpointValue({ base: false, md: true });

    if (session)
        return <>
            <Flex
                className='login-account-info'
                flexDirection={'row'}
                alignItems={'center'}
                cursor={'pointer'}
            >

                {isWide && (
                    <Flex
                        display='flex'
                        alignItems={'center'}
                    >
                        <UserMenu />
                    </Flex>)}

                {!session && <LoginButton />}

            </Flex>
        </>;

    return <LoginButton />
}
