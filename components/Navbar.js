import Link from "next/link";

export default function Navbar() {
    return <nav>
        <ul className="navbar">
            <Link href="/" className="link">Главная</Link>
            <Link href="/about" className="link">О нас</Link>
            <Link href="/places" className="link">Места</Link>
            <Link href="/blog" className="link">Блог</Link>
            <Link href="/forum" className="link">Форум</Link>
            <Link href="/store" className="link">Интернет-магазин</Link>
            <Link href="/contact" className="link">Контакты</Link>
        </ul>
    </nav>
}