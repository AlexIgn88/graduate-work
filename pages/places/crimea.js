import Head from "next/head";

export default function CrimeaPage() {
    return <>
        <Head>
            <title>Крым</title>
        </Head>
        <div className="page crimea-page">

            {/*Подумать: может все-таки сделать авто-генерируемые странички с компонентами чакры,
            а туда пропсами отправлять 
            Заголовок, 
            адрес картинки в Паблик,
            Строку с текстом,
            Строку к нумерованному списку,
            Доп-компонент с телефоном

            т.е. один раз написал на чакре страничку, а контент подаешь пропсами

            +Строку к нумерованному списку можно еще раз использрвать на страничке Туры, если верну ее в проект
            */}

            {/*Заголовок*/}
            <h1>Крым</h1>

            {/*Картинка*/}
            {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}

            {/*Text*/}
            <p>
                Крым - жемчужина на Чёрноморском побережье России, место с удивительной красотой природы и богатой историей.
                Этот полуостров с мягким климатом и множеством солнечных дней притягивает туристов со всего мира.
                В Крыму можно насладиться разнообразием достопримечательностей, которые следует посетить во время увлекательного путешествия."

                1. Ялта и Ливадия - знаменитые курортные города, известные своими прекрасными пляжами и историческими зданиями.
                В Ялте стоит посетить Ливадийский дворец, который служил резиденцией российских императоров,
                и прогуляться по набережной, наслаждаясь великолепным видом на море.

                2. Севастополь - важный исторический и морской город, славящийся своими военно-морскими достижениями.
                Здесь можно посетить легендарную Севастопольскую бухту, обойти Панораму обороны Севастополя и узнать больше о героической истории этого города.

                3. Бахчисарай - город, который прославился своим Дворцово-парковым ансамблем ханского дворца.
                Величественные дворцы, красивые сады и узкие улочки Бахчисарая переносят вас во времена Крымского ханства.

                4. Гора Ай-Петри - очаровывает своей красотой и панорамными видами. Чтобы подняться на гору, можно воспользоваться канатной дорогой,
                которая сама по себе является одной из главных достопримечательностей Крыма.

                5. Судак и его легендарная крепость Генуэзский форт - прекрасное место для пляжного отдыха и осмотра исторических сооружений.
                Крепость была построена в 14 веке и до сих пор впечатляет своей мощью и архитектурой.

                6. Балаклава - уникальная бухта с прозрачными водами и красивыми пляжами.
                Здесь можно провести время наслаждаясь плаванием, подводным дайвингом или просто наслаждаться живописным пейзажем.
                Крым предлагает множество возможностей для отдыха и путешествий.
                Это лишь небольшой обзор достопримечательностей этого прекрасного региона, каждая из которых заслуживает посещения.
                Независимо от того, являетесь ли вы любителем истории, природы или просто ищете отдых на пляже,
                вы обязательно найдете что-то интересное и запоминающееся в Крыму.
            </p>

            {/*Нумерованный список из чакры*/}
            <p>
                1. Тур по Ялте:
                - Места для посещения: Набережная Ялты, Ливадийский дворец, Массандровский парк и винодельня.
                - Описание: Откройте для себя красоту города Ялта, насладитесь прогулкой по знаменитой набережной,
                посетите исторические места и насладитесь прекрасными видами крымских пейзажей.
                - Цена: 500 рублей
                - Длительность: 1 день

                2. Экскурсия по Севастополю:
                - Места для посещения: Храм Святой Троицы, Панорама Обороны Севастополя, Черноморская площадь.
                - Описание: Погрузитесь в историю Севастополя, узнайте о его героическом прошлом,
                посетите памятные места и насладитесь потрясающими видами на Черное море.
                - Цена: 300 рублей
                - Длительность: 1 день

                3. Тур в Бахчисарай:
                - Места для посещения: Дворец Хана, Фонтаны Дворца, Джума-Джами Мечеть.
                - Описание: Погрузитесь в атмосферу крымского востока, посетите исторические места в Бахчисарае,
                насладитесь яркими крымскотатарскими культурами и архитектурой.
                - Цена: 300 рублей
                - Длительность: 1 день

                4. Поход на Гору Ай-Петри:
                - Место для посещения: Гора Ай-Петри.
                - Описание: Завоевывайте вершину Горы Ай-Петри, наслаждайтесь великолепными панорамными видами,
                исследуйте уникальную флору и фауну Крыма.
                - Цена: 300 рублей
                - Длительность: 1 день

                5. Экскурсия в Судак:
                - Места для посещения: Судакская крепость, Генуэзская башня, Гора Фиолент.
                - Описание: Отправьтесь в исторический город Судак, исследуйте его древние крепости и знаменитые достопримечательности,
                насладитесь прогулками по крымским пляжам.
                - Цена: 300 рублей
                - Длительность: 1 день

                6. Тур в Балаклаву:
                - Места для посещения: Балаклавская бухта, Балаклавский аквариум, Генуэзская крепость.
                - Описание: Посетите живописный крымский городок Балаклаву, насладитесь морскими видами,
                посмотрите на местные достопримечательности и научитесь о их истории.
                - Цена: 300 рублей
                - Длительность: 1 день
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