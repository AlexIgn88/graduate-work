import pages from '../components/pages';
import Login from '../components/login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    return <nav>
        <ul className="navbar">
            {pages.filter(page => page?.test ? page.test(session) : true).map(({ name, src }) => <li key={name} className={router.pathname === src ? 'active' : ''}>
                <Link href={src} className="link">{name}</Link></li>)}
            <li><Login /></li>
        </ul>
    </nav>;
}