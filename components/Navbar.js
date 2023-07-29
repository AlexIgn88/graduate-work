import pages from '../data/pagesData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
// import Login from '../components/Login';

import { places } from '../data/placesData';
import { UnorderedList, ListItem, Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, chakra, Button, useBreakpointValue } from '@chakra-ui/react';
import { flexDirection } from '../displayParameters/flexParameters';
// import { marginParameters } from '../displayParameters/marginParameters';



export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();

    // console.log('router.pathname', router.pathname);

    const isWide = useBreakpointValue({ base: false, xl: true });


    //вынести UnorderedList в отдельный компонент
    //Сделать рендер по нажатию на кнопку Меню
    //выровнять все и почистить

    return <nav>


        {/* <Button
            colorScheme='gray'
            display={isWide ? "none" : "block"}
        >Меню</Button> */}


        <Menu >
            <MenuButton
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
                // colorScheme='gray'
                display={isWide ? "none" : "block"}
                as={Button}
            // rightIcon={<ChevronDownIcon />}
            >
                Меню
            </MenuButton>
            <MenuList backgroundColor={'#8d634b'}>

                {/* tourDataCrimea.concat(tourDataKarelia, tourDataKamchatka, tourDataVoronezh); */}

                {/* {pages.filter(page => page?.restricted */}
                {pages.concat(places).filter(page => page?.restricted

                    ? page.restricted(session)
                    : true)
                    .map((page) =>


                        <MenuItem
                            backgroundColor={'#8d634b'}
                            key={page.name}
                        >

                            <Link href={page.src ? page.src : '/' + page.path} className="link">{page.name}</Link>


                        </MenuItem>
                    )}
            </MenuList>
        </Menu>




        <Box display={isWide ? "block" : "none"}>

            <UnorderedList className="navbar" listStyleType={'none'} flexDirection={flexDirection} alignItems='flex-start'>
                {pages.filter(page => page?.restricted
                    ? page.restricted(session)
                    : true)
                    .map(({ name, src }) =>
                        <ListItem key={name} className={router.pathname.split('/')[1] === src.split('/')[1]
                            ? 'active'
                            : ''}>
                            {name === 'Места'
                                ? <Menu>
                                    <MenuButton as={Text} fontSize="lg" marginRight="1rem" cursor="pointer">
                                        <chakra.span className="link">{name}</chakra.span>
                                    </MenuButton>

                                    <MenuList>
                                        <MenuItem as={Link} href={src}  >
                                            Все места
                                        </MenuItem>

                                        {places.map((place, i) => (

                                            <MenuItem key={i} as={Link} href={place.path + '/'}  >
                                                {place.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                : <Link href={src} className="link">{name}</Link>
                            }

                        </ListItem>
                    )}
                {/* <ListItem><Login /></ListItem> */}
            </UnorderedList>

        </Box>



    </nav>;
}