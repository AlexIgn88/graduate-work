import Navbar from '../components/Navbar.js';
// import Login from '../components/Login.js';

export default function Header({ color }) {
    return <header className={color ? color + ' header' : 'header'} style={{ zIndex: '3' }} >
        <Navbar />
        {/* <Login /> */}
    </header>
}