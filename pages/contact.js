import Head from "next/head";
import ContactInfo from '../components/ContactInfo';

export default function ContactsPage() {
    return <>
        <Head>
            <title>Контакты</title>
        </Head>
        <div className="page contacts-page">
            <h1>Контакты</h1>
            <p>Свяжитесь с нами, чтобы узнать больше о наших турах и услугах.</p>
            <ContactInfo />
        </div>
    </>
}