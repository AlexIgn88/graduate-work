import pages from '../data/pagesData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { places } from '../data/placesData';
import {
    UnorderedList, ListItem, Box, Text, Menu, MenuButton, MenuList, MenuItem, chakra, Button, useBreakpointValue
} from '@chakra-ui/react';
import { FcMenu } from "react-icons/fc";


export default function Navbar() {

    const
        router = useRouter(),
        { data: session } = useSession(),
        isWide = useBreakpointValue({ base: false, xl: true });

    let backgroundColor = '';
    switch (true) {
        case '/places' === router.pathname:
            backgroundColor = 'rgb(6, 13, 32)';
            break;
        case 'forum' === router.pathname.split('/')[1]:
            backgroundColor = 'rgb(6, 13, 32)';
            break;
        default:
            backgroundColor = '#8d634b';
            break;
    }

    // console.log('router.pathname', router.pathname);
    // console.log('router.pathname.split('/')[1]=', router.pathname.split('/')[1]);

    return <>
        <nav>

            <Menu>
                <MenuButton
                    title='Навигация сайта'
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
                    ml={'15px'}
                    display={isWide ? "none" : "block"}
                    as={Button}
                ><FcMenu />
                </MenuButton>

                <MenuList
                    backgroundColor={backgroundColor}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    {pages.concat(places).filter((page) => page?.restricted
                        ? page.restricted(session)
                        : true)
                        .map((page) =>

                            <MenuItem
                                key={page.name}
                                as={Link}
                                backgroundColor={backgroundColor}
                                color={'white'}
                                textDecoration={'none'}
                                _focus={{
                                    backgroundColor: 'black'
                                }}
                                href={page.src ? page.src : '/places' + page.path}
                            >
                                {page.name}
                            </MenuItem>
                        )}

                </MenuList>
            </Menu>

            <Box
                display={isWide ? "block" : "none"}
            >
                <UnorderedList
                    className="navbar"
                    listStyleType={'none'}
                    alignItems='flex-start'
                    justifyContent={'space-around'}
                    ml={'0px'}
                >
                    {pages.filter((page) => page?.restricted
                        ? page.restricted(session)
                        : true)
                        .map((page) =>
                            <ListItem key={page.name} className={router.pathname.split('/')[1] === page.src.split('/')[1]
                                ? 'active'
                                : ''}>
                                {page.name === 'Места'
                                    ? <>
                                        <Menu>
                                            <MenuButton as={Text} fontSize="lg" marginRight="1rem" cursor="pointer">
                                                <chakra.span
                                                    pl={'15px'}
                                                    className="link"
                                                    color={'white'}
                                                >
                                                    {page.name}
                                                </chakra.span>
                                            </MenuButton>

                                            <MenuList
                                                backgroundColor={'#8d634b'}
                                            >
                                                <MenuItem
                                                    _focus={{
                                                        backgroundColor: 'rgb(40, 28, 21)'
                                                    }}
                                                    backgroundColor={'#8d634b'}
                                                    color={'white'}
                                                    textDecoration={'none'}
                                                    as={Link}
                                                    href={page.src}  >
                                                    Все места
                                                </MenuItem>

                                                {places.map((place, i) => (

                                                    <MenuItem
                                                        _focus={{
                                                            backgroundColor: 'rgb(40, 28, 21)'
                                                        }}
                                                        backgroundColor={'#8d634b'}
                                                        color={'white'}
                                                        textDecoration={'none'}
                                                        key={i}
                                                        as={Link}
                                                        href={page.src + place.path}
                                                    >
                                                        {place.name}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    </>

                                    : <Link
                                        href={page.src}
                                        className="link"
                                        color={'white'}
                                        textDecoration={'none'}
                                    >
                                        {page.name}
                                    </Link>
                                }
                            </ListItem>
                        )}
                </UnorderedList>
            </Box>
        </nav>
    </>;
}
