export default function Footer({ color }) {
    return (
        <footer className={color ? color + ' main-footer' : 'main-footer'}>
            <p>
                © {new Date().getFullYear()} Туристическое агентство &quot;Исторические маршруты и заповедные места&quot;. Все права защищены.
            </p>
        </footer>
    );
};