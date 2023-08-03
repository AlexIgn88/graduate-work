import { useSession } from 'next-auth/react';
import { Flex, chakra, useBreakpointValue, Avatar } from '@chakra-ui/react';


export default function AccountIcon() {

    const { data: session } = useSession(),
        isWide = useBreakpointValue({ base: false, sm: true });

    if (session) return <>
        <Flex
            flexDirection='row'
            alignItems='center'
        >
            <Avatar
                className='login-avatar'
                name={session?.user?.name}
                src={session?.user?.image}
                width={'32px'}
                height={'32px'}
            />
            <chakra.span
                className='login-username'
                display={isWide ? "block" : "none"}
                m={'15px'}
            >{session?.user?.name}
            </chakra.span>
        </Flex>
    </>
}