import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

// временно - для того, чтобы футер на страничке /myaccount был в самом низу
import { useRouter } from 'next/router';

export default function Layout({ children }) {

    // временно - для того, чтобы футер на страничке /myaccount был в самом низу
    const router = useRouter();

    console.log('router.pathname=', router.pathname);

    return <>
        <Header />
        <main className={router.pathname === '/myaccount' // className временно - для того, чтобы футер на страничке /myaccount был в самом низу
            ? 'myaccount'
            : ''}
        >
            {children}
        </main>
        <Footer />
    </>
};