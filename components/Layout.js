import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { textFontSize } from '../includes/displayParameters';

export default function Layout({ children }) {

    const router = useRouter();

    let color = router.pathname === '/places'
        ? 'dark'
        : '';

    return <>
        <Header color={color} />
        <main className={color ? color : ''}>
            <Box
                fontSize={textFontSize}
            >
                {children}
            </Box>
        </main>
        <Footer color={color} />
    </>
};