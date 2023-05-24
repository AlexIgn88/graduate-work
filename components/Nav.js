import A from "../components/A.js";

export default function Nav() {
    return <nav>
        <ul className="navbar">
            <li><A href={'/'} text="Главная" /></li>
            <li><A href={'/about'} text="О нас" /></li>
            <li><A href={'/places'} text="Места" /></li>
            <li><A href={'/blog'} text="Блог" /></li>
            <li><A href={'/forum'} text="Форум" /></li>
            <li><A href={'/store'} text="Интернет-магазин" /></li>
            <li><A href={'/contact'} text="Контакты" /></li>
        </ul>
    </nav>
}