import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useRouter } from 'next/router';

export default function Layout({ children }) {

    const router = useRouter();

    let color = router.pathname === '/places'
        ? 'dark'
        : '';

    return <>
        <Header color={color} />
        <main className={color ? color : ''}>
            {children}
        </main>
        <Footer color={color} />
    </>
};