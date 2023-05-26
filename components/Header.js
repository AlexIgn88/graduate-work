import Navbar from '../components/Navbar.js';
import Login from '../components/Login.js';
import Registration from '../components/registration.js';

export default function Header() {
    return <header>
        <Navbar />
        <Login />
        <Registration />
    </header>
}