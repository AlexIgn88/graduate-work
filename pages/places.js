import Head from 'next/head';
import Link from 'next/link';
import { Fragment } from 'react';
import { places, loremIpsum } from '../data/placesData';
import { h1HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';

export default function PlacesPage() {
    //переделаю позже всё на Chakra UI. Адаптивности пока нет)))

    return <>
        <Head>
            <title>Места</title>
        </Head>
        {/*временно инлайновый стиль: */}
        <div className="page places-page" style={{ marginLeft: '200px', marginRight: '200px' }}>
            <div className="cards">
                {places.flatMap((place, index) => {
                    const isEven = index % 2 === 0;
                    return [
                        // isEven ? (
                            <Fragment key={place.id}>
                                <div>
                                    <Link href={`/places/${place.path}`} className="one-card">
                                        <img className="card-img" src={place.img ? place.img : '/img/favicon.png'} alt={place.name}></img>
                                    </Link>
                                </div>
                                <div className="card-img" >
                                    {/*временно инлайновый стиль: */}
                                    <h1 style={{ fontSize: h1HeadersFontSize.sm }}>{place.name}</h1>
                                    {/*временно инлайновый стиль: */}
                                    <div style={{ fontSize: textFontSize.sm }}>
                                        {place.text ? place.text : loremIpsum}
                                    </div>
                                    <div>
                                        <Link href={`/places/${place.path}`} className='link learn-more-button'>Узнать больше</Link>
                                    </div>
                                </div>
                            </Fragment>
                        // ) : (
                        //     <Fragment key={place.id}>
                        //         <div className="card-img" >
                        //             {/*временно инлайновый стиль: */}
                        //             <h1 style={{ fontSize: headersFontSize.sm }}>{place.name}</h1>
                        //             {/*временно инлайновый стиль: */}
                        //             <div style={{ fontSize: textFontSize.sm }}>
                        //                 {place.text ? place.text : loremIpsum}
                        //             </div>
                        //             <div>
                        //                 <Link href={`/places/${place.path}`} className='link learn-more-button'>Узнать больше</Link>
                        //             </div>
                        //         </div>
                        //         <div>
                        //             <Link href={`/places/${place.path}`} className="one-card">
                        //                 <img className="card-img" src={place.img ? place.img : "/img/favicon.png"} alt={place.name}></img>
                        //             </Link>
                        //         </div>
                        //     </Fragment>
                        // )
                    ];
                })}
            </div >
        </div >
    </>
}