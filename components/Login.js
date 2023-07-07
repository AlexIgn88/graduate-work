import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
    const { data: session } = useSession();
    if (session)
        return <>
            <div className='account-info'>
                {session?.user?.image && <img src={session?.user?.image || ''} width={32} height={32} alt="ava" />}
                {session?.user?.name}
            </div>
            <button className='login-button' onClick={() => signOut()}>Выйти</button>
        </>;
    return <>
        <button className='login-button' onClick={() => signIn()}>Войти</button>
    </>;
}