import pages from '../data/pagesData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { places } from '../data/placesData';
import { UnorderedList, ListItem, Text, Menu, MenuButton, MenuList, MenuItem, chakra } from '@chakra-ui/react';
import { FcHome } from "react-icons/fc";
import { ChevronDownIcon } from '@chakra-ui/icons';


export default function NavbarListComponent({ flexDirection, backgroundColor, backgroundColorFocus }) {

    const
        router = useRouter(),
        { data: session } = useSession();


    return (
        <UnorderedList
            className="navbar"
            listStyleType={'none'}
            ml={'0px'}
            pl={'0px'}
            display={'flex'}
            flexDirection={flexDirection}
            alignItems={'center'}
        >
            {pages.filter((page) => page?.restricted
                ? page.restricted(session)
                : true)
                .map((page) =>
                    <ListItem key={page.name} className={router.pathname.split('/')[1] === page.src.split('/')[1]
                        ? 'active'
                        : ''}>
                        {page.name === 'Главная'
                            ? <Text
                                href={page.src}
                                color={'white'}
                                textDecoration={'none'}
                                as={Link}
                            >
                                <FcHome />
                            </Text>
                            : page.name === 'Места'
                                ? <>
                                    <Menu>
                                        <MenuButton
                                            as={Text}
                                            fontSize="lg"
                                            cursor="pointer"
                                            position={'relative'}
                                            left={flexDirection === 'column' ? '10px' : '0px'}
                                        >
                                            <chakra.span
                                                className="link"
                                                color={'white'}
                                                ml={{ base: '5px', xl: '10px' }}
                                            >
                                                {page.name}<ChevronDownIcon />
                                            </chakra.span>
                                        </MenuButton>

                                        <MenuList
                                            backgroundColor={backgroundColor}
                                        >
                                            <MenuItem
                                                _focus={{
                                                    backgroundColor: backgroundColorFocus
                                                }}
                                                backgroundColor={backgroundColor}
                                                color={'white'}
                                                textDecoration={'none'}
                                                as={Link}
                                                href={page.src}
                                            >
                                                Все места
                                            </MenuItem>

                                            {places.map((place, i) => (

                                                <MenuItem
                                                    _focus={{
                                                        backgroundColor: backgroundColorFocus
                                                    }}
                                                    backgroundColor={backgroundColor}
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

                                : <Text
                                    as={Link}
                                    m={{ base: '5px', lg: '10px', xl: '30px' }}
                                    href={page.src}
                                    className="link"
                                    color={'white'}
                                    textDecoration={'none'}
                                >
                                    {page.name}
                                </Text>
                        }
                    </ListItem>
                )}
        </UnorderedList>
    )
}