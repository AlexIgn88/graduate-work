import Head from "next/head";
import { Heading, Text, Box, Flex } from '@chakra-ui/react';
import { h1HeadersFontSize, textFontSize } from '../../displayparameters/fontDisplayParameters';
import { marginParameters } from '../../displayparameters/marginDisplayParameters';
import { flexDirection } from '../../displayparameters/flexDisplayParameters';
import { HeadingForPage } from '../../components/ElemsForPages';

export default function KareliaPage() {
    return <>
        <Head>
            <title>Карелия</title>
        </Head>
        <div className="page karelia-page">

            {/*Заголовок*/}
            {/* <h1>Карелия</h1> */}
            <HeadingForPage element={'h1'} content={'Карелия'} />

            {/*Картинка*/}
            {/*<Image src={property.imageUrl} alt={property.imageAlt} />*/}

            {/*Text*/}
            <p>
                Карелия - это уникальный регион России, который славится своей красотой и природой.
                Здесь можно найти множество достопримечательностей, которые стоит посетить.
                Одной из главных достопримечательностей Карелии является горный массив Хибины.
                Это один из самых высоких горных массивов в Европе, который находится на границе Карелии и Мурманской области.
                Здесь можно увидеть красивые горные пейзажи, а также посетить музей природы и музей геологии.
                Еще одной достопримечательностью Карелии является водопад Кивач. Это самый большой водопад в Европе, расположенный на реке Суна.
                Высота водопада составляет около 10 метров, а ширина - более 20 метров. Вокруг водопада можно прогуляться по живописному лесу и насладиться чистым воздухом.
                Также стоит посетить горный парк "Рускеала", который находится в 40 километрах от Петрозаводска.
                Этот парк был создан на месте заброшенных карьеров по добыче мрамора.
                Здесь можно прогуляться по красивым тропинкам, посетить музеи и посмотреть на красивые виды.
                В Карелии также можно посетить множество других достопримечательностей, таких как Онежское озеро,
                Ладожское озеро, остров Кижи и многое другое. Каждая из этих достопримечательностей имеет свою уникальную историю и красоту.
                Если вы хотите провести свой отпуск в Карелии, то это отличное место для отдыха. Здесь вы сможете насладиться красивыми пейзажами,
                посетить интересные музеи и просто отдохнуть от городской суеты.
            </p>

            {/*Галерея или просто Блок на 4 фото*/}

            {/*Ненумерованный список из чакры*/}
            <p>
                1. Горный массив Хибины: посещение горного массива, наблюдение за северным сиянием, прогулки по горам. Цена за тур: от 3000 рублей. Кол-во дней: 7 дней.

                2. Посещение музеев, рассказывающих об истории и природе Карелии. Цена за экскурсию: от 800 рублей. Кол-во дней: 1 день.

                3. Водопад Кивач: посещение водопада, расположенного на реке Шуя. Цена за экскурсию: от 600 рублей. Кол-во дней: 1-2 дня.

                4. Парк "Рускеала": посещение парка, который включает в себя мраморный каньон и мраморные карьеры.
                Цена за посещение парка: от 400 рублей за взрослого и от 350 рублей за ребенка.
                Кол-во дней: зависит от выбранного времени посещения.

                5. Водная прогулка на лодках по Онежскому озеру:
                Цена на аренду лодки: от 500 рублей в час.
                Кол-во дней: от 2 до 7 дней в зависимости от маршрута.

                6. Ладожское озеро: посещение одного из крупнейших озер Европы.
                Цена за аренду лодки: 500-900 рублей в день.
                Кол-во дней: в зависимости от выбранного маршрута.

                7. Остров Кижи, на котором находится музей деревянного зодчества.
                Цена за вход: от 550 рублей для взрослого и 250 рублей для ребенка.
                Кол-во дней: 1 день.
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