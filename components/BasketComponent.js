import { Box, Flex, Skeleton, Stack, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';


export default function StoreComponent({ data, mutate }) {

    console.log('data=', data);

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    //Константа для определения количества скелетонов
    const numberOfSkeletons = 5;

    //useState для управляемых инпутов
    const
        defaultinputVal = Array(data?.length || numberOfSkeletons)?.fill(0),
        [inputVal, setInputVal] = useState(defaultinputVal);

    // console.log('inputVal', inputVal);

    useEffect(() => {
        setInputVal(
            // Array(data?.length)?.fill(0)
            data && (!data?.error) && data?.map(({ number }) => number) || Array(numberOfSkeletons)?.fill(0)
        );
    }, [data]);


    if (!data) return (
        <Stack flexDirection={flexDirection}>
            {[...Array(numberOfSkeletons)].map((_, i) => <Skeleton key={i} w={'384px'} h={'735px'} />)}
        </Stack>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        // console.log('inputVal', inputVal);


        async function del(id) {

            try {
                mutate(changeDataDel(id));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            } finally {
                null;
            }
        }

        async function changeDataDel(id) {
            try {

                let response;

                id
                    ? response = await fetch(`/api/store/basket/${id}`, {
                        method: 'DELETE',
                    })

                    : response = await fetch(`/api/store/basket`, {
                        method: 'DELETE',
                    })

                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);

                if (id) {
                    return data?.filter(item => id !== +item?.id)
                } else {
                    return [];
                }

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }


        return (
            (data.length > 0)
                ? (inputVal[0] > 0) && <Flex flexDirection={'column'} alignItems={'center'} gap={'20px'}>
                    <ButtonGroup display={'flex'} alignItems={'baseline'} gap={'1vw'} flexDirection={flexDirection}>

                        <Button colorScheme='blue' width={'167px'} onClick={() => alert('ПОДТВЕРЖДАЕМ')}>Подтвердить заказ</Button>

                        <ModalWindowBlur
                            buttonText={'Очистить корзину'}
                            buttonColorScheme={'blue'}
                            width={'167px'}
                        >
                            <NotificationProductRemoved del={del} />

                        </ModalWindowBlur>

                    </ButtonGroup>
                    <Box>Общая сумма заказа:&#160;
                        {data.map(({ price, number }) => (price * number)).reduce((sum, current) => sum + current, 0).toFixed(2)}
                        &#160;&#8381;
                    </Box>
                    <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                        {data.map(({ id, name, price, category, description, quantity, image, number }, productArrIndex) => {

                            function handleDelProduct() {
                                return del(id);
                            }

                            return (<Flex key={productArrIndex} flexDirection={'column'} alignItems={'center'} flexGrow={'1'}>
                                <Box>Количество для заказа: {number}</Box>
                                <ProductCard
                                    id={id}
                                    name={name}
                                    price={price}
                                    category={category}
                                    description={description}
                                    quantity={quantity}
                                    image={image}
                                    inputVal={inputVal}
                                    setInputVal={setInputVal}
                                    productArrIndex={productArrIndex}
                                >
                                    <Flex flexDirection={'column'}>
                                        <ModalWindowBlur
                                            buttonText={'Удалить товар'}
                                            buttonColorScheme={'blue'}
                                        >
                                            <NotificationProductRemoved del={handleDelProduct} />
                                        </ModalWindowBlur>
                                    </Flex>
                                </ProductCard>
                            </Flex>)
                        }
                        )}
                    </Flex>
                </Flex>

                : <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'20px'}>
                    <Text textAlign={'center'}>Ваша корзина пуста. Для осуществления покупок перейдите, пожалуйста, на страницу Сувенирной лавки</Text>
                    <Button
                        as={Link}
                        href={'/store'}
                        colorScheme='blue'
                    >Сувенирная лавка
                    </Button>
                </Flex>
        )
    }
}

function NotificationProductRemoved({ onClose, del }) {


    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >

            <Box textAlign={'center'}>Подтверждаете удаление?</Box>

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}

            >
                <Button
                    colorScheme='blue'
                    onClick={() => { del(); onClose() }}
                >Удалить
                </Button>
                <Button
                    colorScheme='blue'
                    onClick={() => {
                        onClose();
                    }}>Отмена
                </Button>
            </Flex>
        </Flex>)
}