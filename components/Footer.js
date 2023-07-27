export default function Footer({ color }) {
    return (
        <footer className={color ? color + ' footer' : 'footer'}>
            <p>
                © {new Date().getFullYear()} Туристическое агентство "Исторические маршруты и заповедные места". Все права защищены.
            </p>
        </footer>
    );
};