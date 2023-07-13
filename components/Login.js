import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
    const { data: session } = useSession();
    if (session)
        return <div className='login-account-info'>
            {session?.user?.image && <img src={session?.user?.image || ''} alt="avatar" className='login-avatar' />}
            <span className='login-username'><Link href='/myaccount' className='' title='Мой аккаунт'>{session?.user?.name}</Link></span>
            <button className='login-button' onClick={() => signOut()}>Выйти</button>
        </div>;
    return <div className='login-account-info'>
        <button className='login-button' onClick={() => signIn()}>Войти</button>
    </div>;
}