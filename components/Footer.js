import Image from 'next/image';
import Link from 'next/link';
import { Box, Heading, Text, Divider, Flex, chakra, ListItem, UnorderedList, ListIcon } from "@chakra-ui/react";
import { marginParameters, halfMarginParameters } from '../displayParameters/marginParameters';
import { textFontSize, h2HeadersFontSize } from '../displayParameters/fontParameters';
import { Phone, Email } from '../includes/cell-wrappers';
import { FcGlobe, FcPhone, FcFeedback } from "react-icons/fc";
import { SocialIcon } from 'react-social-icons';


export default function Footer({ color }) {
    return (
        <footer className={color ? color + ' main-footer' : 'main-footer'}>
            <Box
                className="footer-container"
                m={marginParameters}
                mt={halfMarginParameters}
                mb={halfMarginParameters}
                fontSize={textFontSize.base}
            >
                <Flex
                    className="footer-row"
                    flexDirection={{ base: 'column', md: 'row' }}
                    alignItems={'flex-start'}
                    gap={'20px'}
                >
                    <Flex
                        className="footer-col"
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}
                        width={{ base: '100%', md: '25%' }}
                        gap={'20px'}
                    >
                        <Link href="/">
                            <Image
                                src="/img/favicon.png"
                                alt=""
                                className="img-fluid logo-footer"
                                width={100}
                                height={100}
                                priority={true}
                                style={{
                                    borderRadius: '10%',
                                    aspectRatio: '4/3',
                                    width: '70px',
                                    height: 'auto',
                                }}
                            />
                        </Link>
                        <Box className="footer-about">
                            <Text textAlign={'left'}>
                                Мы предлагаем широкий выбор туров и экскурсий.
                                Наши опытные менеджеры помогут Вам выбрать идеальный маршрут для Вашего путешествия.
                            </Text>
                        </Box>

                    </Flex>
                    <Flex
                        className="footer-col"
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}
                        width={{ base: '100%', md: '25%' }}
                    >
                        <Flex className="useful-link" gap={'20px'} flexDirection={'column'}>
                            <Heading fontSize={h2HeadersFontSize.base}>Полезные ссылки</Heading>
                            <Flex flexWrap={'wrap'} gap={'10px'} justifyContent={'center'}>
                                <UnorderedList
                                    className="use-links"
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'flex-start'}
                                    gap={'10px'}
                                >
                                    <ListItem className='footer-useful-Links'><Link href="/"><chakra.span color={'grey'}>&#187;</chakra.span> Главная</Link></ListItem>
                                    <ListItem className='footer-useful-Links'><Link href="/about"><chakra.span color={'grey'}>&#187;</chakra.span> О наc</Link></ListItem>
                                    {/* <ListItem className='footer-useful-Links'><Link href="/galary"><chakra.span color={'grey'}>&#187;</chakra.span> Галерея</Link></ListItem> */}
                                    <ListItem className='footer-useful-Links'><Link href="/contact"><chakra.span color={'grey'}>&#187;</chakra.span> Контакты</Link></ListItem>
                                </UnorderedList>

                                <UnorderedList
                                    className="use-links"
                                    display={'flex'}
                                    flexDirection={'column'}
                                    alignItems={'flex-start'}
                                    gap={'10px'}
                                >
                                    <ListItem className='footer-useful-Links'><Link href="/tours"><chakra.span color={'grey'}>&#187;</chakra.span> Все туры</Link></ListItem>
                                    <ListItem className='footer-useful-Links'><Link href="/forum"><chakra.span color={'grey'}>&#187;</chakra.span> Форум</Link></ListItem>
                                    <ListItem className='footer-useful-Links'><Link href="/store"><chakra.span color={'grey'}>&#187;</chakra.span> Сувениры</Link></ListItem>
                                </UnorderedList>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex
                        className="footer-col"
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}
                        width={{ base: '100%', md: '25%' }}
                    >
                        <Flex className="social-links" gap={'20px'} flexDirection={'column'}>
                            <Heading fontSize={h2HeadersFontSize.base}>Мы в соцсетях</Heading>
                            <UnorderedList
                                className="social-icons"
                                display={'flex'}
                                flexDirection={'row'}
                                alignItems={'flex-start'}
                                gap={'10px'}
                            >
                                <ListItem background={'white'} borderRadius={'50%'}>
                                    <SocialIcon url="https://vk.com" />
                                </ListItem>

                                <ListItem background={'white'} borderRadius={'50%'}>
                                    <SocialIcon url="https://web.telegram.org/a/" />
                                </ListItem>

                                <ListItem background={'white'} borderRadius={'50%'}>
                                    <SocialIcon url="https://web.whatsapp.com/" />
                                </ListItem>
                            </UnorderedList>
                        </Flex>
                    </Flex>
                    <Flex
                        className="footer-col"
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}
                        width={{ base: '100%', md: '25%' }}
                    >
                        <Flex className="address" gap={'20px'} flexDirection={'column'}>
                            <Heading fontSize={h2HeadersFontSize.base}>Адрес</Heading>
                            <UnorderedList
                                className="address-links"
                                display={'flex'}
                                flexDirection={'column'}
                                alignItems={'flex-start'}
                                gap={'10px'}
                            >
                                <ListItem>
                                    <Text textAlign={'left'}>
                                        <ListIcon as={FcGlobe} />
                                        <chakra.span>г. Москва, ул. Исторических маршрутов, д.1, офис 123</chakra.span>
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text>
                                        <ListIcon as={FcPhone} />
                                        <chakra.span textDecor={'underline'}><Phone value={'+7 (495) 123-45-67'} /></chakra.span>
                                    </Text>
                                </ListItem>
                                <ListItem>
                                    <Text>
                                        <ListIcon as={FcFeedback} />
                                        <chakra.span textDecor={'underline'}><Email value={'info@historicalroutes.com'} /></chakra.span>
                                    </Text>
                                </ListItem>
                            </UnorderedList>
                        </Flex>
                    </Flex>
                    {/* <a
                        href="https://metrika.yandex.ru/stat/?id=95641750&amp;from=informer"
                        target="_blank"
                        rel="nofollow">
                        <img
                            src="https://informer.yandex.ru/informer/95641750/3_1_FFFFFFFF_EFEFEFFF_0_visits"
                            style={{ width: '88px', height: '31px', border: '0' }}
                            alt="Яндекс.Метрика"
                            title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
                            className="ym-advanced-informer"
                            data-cid="95641750"
                            data-lang="ru"
                        />
                    </a> */}
                </Flex>
            </Box>
            <Divider />
            <section className="footer-copy-right">
                <Box className="copy-right-sec" fontSize={textFontSize.base} pt={'20px'}>
                    <Text>
                        © {new Date().getFullYear()} Туристическое агентство &quot;Исторические маршруты и заповедные места&quot;. Все права защищены.
                    </Text>
                </Box>
            </section>
        </footer>
    );
};
