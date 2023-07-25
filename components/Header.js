import Navbar from '../components/Navbar.js';
// import Login from '../components/Login.js';

export default function Header({ color }) {
    return <header className={color ? color : ''}>
        <Navbar />
        {/* <Login /> */}
    </header>
}