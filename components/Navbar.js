import pages from '../data/pagesData';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
// import Login from '../components/Login';

import { places } from '../data/placesData';
import {
    UnorderedList, ListItem, Box, Text, Menu, MenuButton, MenuList, MenuItem, chakra, Button, useBreakpointValue
} from '@chakra-ui/react';



export default function Navbar() {

    const
        router = useRouter(),
        { data: session } = useSession(),
        isWide = useBreakpointValue({ base: false, xl: true });

    // console.log('router.pathname', router.pathname);

    return <>
        <nav>

            <Menu>
                <MenuButton
                    title='Навигация сайта'
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
                    m={'15px'}
                    display={isWide ? "none" : "block"}
                    as={Button}
                // rightIcon={<ChevronDownIcon />}
                > Меню
                </MenuButton>

                <MenuList
                    backgroundColor={'#8d634b'}
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
                                backgroundColor={'#8d634b'}
                                color={'white'}
                                textDecoration={'none'}
                                _focus={{
                                    backgroundColor: 'rgb(40, 28, 21)'
                                }}
                                href={page.src ? page.src : '/places' + page.path}
                            >
                                {page.name}
                            </MenuItem>
                        )}
                    <MenuItem
                        backgroundColor={'#8d634b'}
                        color={'white'}
                        _focus={{
                            backgroundColor: 'rgb(40, 28, 21)'
                        }}
                    >
                        {session
                            ? <chakra.span
                                onClick={() => signOut()}
                            >
                                Выйти
                            </chakra.span>
                            : <chakra.span
                                onClick={() => signIn()}
                            >
                                Войти
                            </chakra.span>
                        }

                    </MenuItem>
                </MenuList>
            </Menu>

            <Box
                display={isWide ? "block" : "none"}
            >
                <UnorderedList
                    className="navbar"
                    listStyleType={'none'}
                    alignItems='flex-start'
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

                    {/* <ListItem><Login /></ListItem> */}
                </UnorderedList>
            </Box>
        </nav>
    </>;
}
