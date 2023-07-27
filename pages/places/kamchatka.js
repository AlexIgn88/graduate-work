import Head from "next/head";

export default function KamchatkaPage() {
    return <>
        <Head>
            <title>Камчатка</title>
        </Head>
        <div className="page kamchatka-page">

            {/*Заголовок*/}
            <h1>Камчатка</h1>

            {/*Картинка*/}
            {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}

            {/*Text*/}
            <p>
                Это удивительное место, которое обязательно стоит посетить. Здесь вы найдете множество достопримечательностей,
                которые оставят незабываемые впечатления.
                Одной из главных достопримечательностей Камчатки является вулкан Шишель.
                Это действующий вулкан, который находится на территории Камчатского края.
                Вулкан Шишель имеет высоту около 3000 метров и является одним из самых высоких на Камчатке.
                Рядом с вулканом находится кратер, который можно посетить.
                Еще одной достопримечательностью Камчатки является озеро Курильское. Это одно из самых красивых озер в мире,
                которое находится на территории Национального парка "Вулканы Камчатки".
                Озеро Курильское имеет кристально чистую воду и является домом для многих видов рыб и животных.
                Также на Камчатке можно посетить вулкан Ключевская Сопка. Это самый высокий вулкан в Евразии, который достигает высоты более 4,8 километров.
                Вулкан Ключевская Сопка является действующим и может извергаться в любое время.
                Кроме того, на Камчатке есть множество других достопримечательностей, таких как горячие источники,
                гейзеры, водопады и многое другое. Камчатка - это место, где можно насладиться природой,
                познакомиться с местной культурой и традициями, а также попробовать местную кухню.
            </p>

            {/*Нумерованный список из чакры*/}
            <p>
                1. Вулкан Шишель:
                В рамках этого тура вы сможете посетить вулкан Шишель и его окрестности, включая горячие источники и гейзеры.
                Цена за этот тур составляет от 3000 до 5000 рублей, а продолжительность - от 3 до 5 дней.

                2. Озеро Курильское:
                В рамках этой экскурсии вы сможете посетить озеро Курильское и его окрестности,
                а также насладиться красивыми видами на вулканы и горные хребты.
                Цена за эту экскурсию составляет от 2000 до 3000 рублей, а продолжительность - от 2 до 3 дней.

                3. Вулкан Ключевская Сопка:
                В рамках похода вы сможете посетить Ключевскую Сопку и ее окрестности, включая гейзеры и водопады.
                Цена за тур составляет от 5000 до 7000 рублей, а продолжительность - от 5 до 7 дней.
            </p>

            {/*дополнительный component - он стандартен для всех таких страничек*/}
            <p>
                Для заказа тура или экскурсии свяжитесь с нашим менеджером
                Телефон: +7 (495) 123-45-67
                Email: info@historicalroutes.com
            </p>
        </div>
    </>
}