import { useContext } from 'react';
import DataContext from '../components/dataContext.js';

export default function Registration() {
    const { user } = useContext(DataContext);
    if (!user) return <form method="post" className='registration-form'>Регистрация
        <label>Имя<input name="username" /></label>
        <label>Имя пользователя<input name="realname" /></label>
        <label>Пароль<input name="psw" type="password" /></label>
        <input type="hidden" name="action" value="registration" />
        <input type="submit" value="Зарегистрироваться" className="" />
    </form>
}