import AccountIcon from '../components/AccountIcon';
import { Menu, MenuButton, MenuList, MenuItem, Button, } from '@chakra-ui/react';
import Link from 'next/link';
import userMenuItems from '../data/userMenuItemsData';
import { useSession, signOut } from 'next-auth/react';
import { FcExport } from "react-icons/fc";


export default function UserMenu() {

    const
        { data: session } = useSession();

    if (session) return <>
        <Menu>
            <MenuButton
                backgroundColor={'#feb849'}
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
                }}
                m={'15px'}
                as={Button}
            > <AccountIcon />
            </MenuButton>

            <MenuList
                display={'flex'}
                flexDirection={'column'}

                color={'black'}
            >
                {userMenuItems.filter((item) => item?.restricted
                    ? item.restricted(session)
                    : true)
                    .map((item) =>

                        <MenuItem
                            key={item.name}
                            as={Link}
                            textDecoration={'none'}
                            // _focus={{
                            //     backgroundColor: 'rgb(40, 28, 21)'
                            // }}
                            href={item.src}
                        >
                            <item.icon /> &#160; {item.name}
                        </MenuItem>
                    )}
                <MenuItem
                    textDecoration={'none'}
                    onClick={() => signOut()}
                >
                    <FcExport />
                    &#160;
                    Выйти
                </MenuItem>
            </MenuList>
        </Menu>
    </>
}