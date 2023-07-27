import pages from '../data/pagesData';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Login from '../components/Login';

export default function Navbar() {
    const router = useRouter();
    const { data: session } = useSession();
    return <nav>
        <ul className="navbar">
            {pages.filter(page => page?.restricted
                ? page.restricted(session)
                : true)
                .map(({ name, src }) =>
                    <li key={name} className={router.pathname === src
                        ? 'active'
                        : ''}>
                        <Link href={src} className="link">{name}</Link>
                    </li>
                )}
                <li><Login /></li>
        </ul>
    </nav>;
}