import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Img, Box, chakra, useBreakpointValue } from '@chakra-ui/react';


export default function AccountIcon() {

    const { data: session } = useSession(),
        isWide = useBreakpointValue({ base: false, sm: true });

    return <>
        <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
        >

            {session?.user?.image &&
                <Link href='/myaccount' title='Мой аккаунт'>
                    <Img
                        src={session?.user?.image || ''}
                        alt="avatar"
                        className='login-avatar'
                        mr={{ base: '30px', '2xl': '0px', xl: '0px', lg: '0px', md: '0px', sm: '0px' }}
                    />
                </Link>}

            <chakra.span
                className='login-username'
                display={isWide ? "block" : "none"}
            >
                <Link href='/myaccount' title='Мой аккаунт'>{session?.user?.name}</Link>
            </chakra.span>


        </Box>
    </>
}