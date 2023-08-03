import AccountIcon from '../components/AccountIcon';
import { Menu, MenuButton, MenuList, MenuItem, Button, } from '@chakra-ui/react';
import Link from 'next/link';
import userMenuItems from '../data/userMenuItemsData';
import { useSession } from 'next-auth/react';


export default function UserMenu() {

    const
        { data: session } = useSession();

    return <>
        <Menu>
            <MenuButton
                // backgroundColor={'#281c15'}
                backgroundColor={'#feb849'}
                // backgroundColor={'#feb849'}
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
                m={'15px'}
                as={Button}
            // rightIcon={<ChevronDownIcon />}
            > <AccountIcon />
            </MenuButton>

            <MenuList
                // backgroundColor={'#8d634b'}
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
                            // backgroundColor={'#8d634b'}
                            // color={'white'}
                            textDecoration={'none'}
                            // _focus={{
                            //     backgroundColor: 'rgb(40, 28, 21)'
                            // }}
                            href={item.src}
                        >
                            <item.icon /> &#160; {item.name}
                        </MenuItem>
                    )}
            </MenuList>
        </Menu>
    </>
}