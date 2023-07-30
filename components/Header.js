import Navbar from '../components/Navbar.js';
import Login from '../components/Login.js';

export default function Header({ color }) {
    
    //нужно выровнять на узкой ширине экрана кпонку меню, иконку пользователя и кнопку выхода флексом, не успеваю
    return <header className={color ? color + ' header' : 'header'} style={{ zIndex: '3', display: 'flex', alignItems: 'center' }} >
        <Navbar />
        <Login />
    </header>
}