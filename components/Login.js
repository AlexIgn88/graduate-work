import { useContext } from 'react';
import DataContext from '../components/dataContext.js';

export default function Login() {
  const { user } = useContext(DataContext);
  return <form method="post" className='login-form'>Для входа введите свой логин и пароль
    {user
      ? <>
        <h2>Hello, {user.realname}</h2>
      </>
      : <>
        <label>Имя<input name="username" /></label>
        <label>Пароль<input name="psw" type="password" /></label>
      </>
    }
    <input type="hidden" name="action" value={user ? 'logout' : 'login'} />
    <input type="submit" value={user ? 'Разлогиниться' : 'Залогиниться'} className="" />
  </form>;
} 