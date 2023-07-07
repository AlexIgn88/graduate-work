import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
    const { data: session } = useSession();
    if (session)
        return <>
            {session?.user?.image && <img src={session?.user?.image || ''} width={32} height={32} alt="ava" />}
            {session?.user?.name}
            <button onClick={() => signOut()}>Выйти</button>
        </>;
    return <>
        <button onClick={() => signIn()}>Войти</button>
    </>;
}