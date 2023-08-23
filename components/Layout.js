import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { textFontSize } from '../displayParameters/fontParameters';

export default function Layout({ children }) {

    const router = useRouter();

    let theme = router.pathname === '/places'
        ? 'places'
        : '';


    // let theme = '';
    // switch (router.pathname) {
    //     case '/places':
    //         theme = 'places';
    //         break;
    //     case '/about':
    //         theme = 'about';
    //         break;
    //     default:
    //         theme = '';
    //         break; 
    // }

    return <>
        <Header color={theme} />
        <main className={theme ? theme : ''}>
            <Box
                fontSize={textFontSize}
            >
                {children}
            </Box>
        </main>
        <Footer />
    </>
};