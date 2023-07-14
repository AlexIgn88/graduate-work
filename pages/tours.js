import Head from "next/head";

import { useState } from 'react';

export default function ToursPage() {

    const
        [selectedTours, setSelectedTours] = useState([]),
        tourList = [
            { id: 1, name: 'Тур №1', description: 'Описание тура №1' },
            { id: 2, name: 'Тур №2', description: 'Описание тура №2' },
            { id: 3, name: 'Тур №3', description: 'Описание тура №3' },
        ];

    const handleTourSelect = (tourId) => {
        const tour = tourList.find((tour) => tour.id === tourId);
        setSelectedTours([...selectedTours, tour]);
    };

    return <>
        <Head>
            <title>Заказать тур</title>
        </Head>
        <div className="page tours-page">
            <h1>Заказать тур</h1>
            <ul>
                {tourList.map((tour) => (
                    <li key={tour.id}>
                        <h3>{tour.name}</h3>
                        <p>{tour.description}</p>
                        <button onClick={() => handleTourSelect(tour.id)}>Выбрать</button>
                    </li>
                ))}
            </ul>
            <h2>Выбранные туры:</h2>
            <ul>
                {selectedTours.map((tour) => (
                    <li key={tour.id}>
                        <h3>{tour.name}</h3>
                        <p>{tour.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
}