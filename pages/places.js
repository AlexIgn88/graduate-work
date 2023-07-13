import Head from "next/head";
import Link from "next/link";

export default function PlacesPage() {
    let places = [
        { id: '1', name: 'Крым', path: 'crimea', img: '/img/places/Crimea.jpg' },
        { id: '2', name: 'Карелия', path: 'karelia', img: '/img/places/Karelia.jpg' },
        { id: '3', name: 'Камчатка', path: 'kamchatka', img: '/img/places/Kamchatka.jpg' },
        { id: '4', name: 'Красоты земли Воронежской', path: 'voronezh-land', img: '/img/places/Voronezh-land.jpg' },
        // { id: '5', name: 'Тестовая карточка', path: 'test', img: null }
    ];

    // console.log(places.length);

    return <>
        <Head>
            <title>Места</title>
        </Head>
        <div className="places-page">
            <h1>Места</h1>
            <ol className="cards">
                {places.map(place => (
                    <li key={place.id} >
                        <Link href={`/places/${place.path}`} className="one-card">
                            {place.name}
                            <img className="card-img" src={place.img ? place.img : "/img/favicon.png"} alt={place.name}></img>
                        </Link>
                    </li>
                ))}
            </ol>
        </div>
    </>
}