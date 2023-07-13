import Head from "next/head";

export default function ContactsPage() {
    return <>
        <Head>
            <title>Контакты</title>
        </Head>
        <div className="page contacts-page">
            <h1>Контакты</h1>
            <p>Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</p>
            <div className="contact-info">
                <p><strong>Адрес:</strong> г. Москва, ул. Исторических маршрутов, д.1, офис 123</p>
                <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
                <p><strong>Email:</strong> info@historicalroutes.com</p>
            </div>
        </div>
    </>
}