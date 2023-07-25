import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { places, loremIpsum } from '../includes/placesData';

export default function PlacesPage() {

    return <>
        <Head>
            <title>Места</title>
        </Head>
        <div className="page places-page">
            <div className="cards">
                {places.flatMap((place, index) => {
                    const isEven = index % 2 === 0;
                    return [
                        isEven ? (
                            <Fragment key={place.id}>
                                <div>
                                    <Link href={`/places/${place.path}`} className="one-card">
                                        <img className="card-img" src={place.img ? place.img : "/img/favicon.png"} alt={place.name}></img>
                                    </Link>
                                </div>
                                <div className="card-img" >
                                    <h1>{place.name}</h1>
                                    <div>
                                        {place.text ? place.text : loremIpsum}
                                    </div>
                                    <div>
                                        <Link href={`/places/${place.path}`} className='link learn-more-button'>Узнать больше</Link>
                                    </div>
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment key={place.id}>
                                <div className="card-img" >
                                    <h1>{place.name}</h1>
                                    <div>
                                        {place.text ? place.text : loremIpsum}
                                    </div>
                                    <div>
                                        <Link href={`/places/${place.path}`} className='link learn-more-button'>Узнать больше</Link>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/places/${place.path}`} className="one-card">
                                        <img className="card-img" src={place.img ? place.img : "/img/favicon.png"} alt={place.name}></img>
                                    </Link>
                                </div>
                            </Fragment>
                        )
                    ];
                })}
            </div >
        </div >
    </>
}