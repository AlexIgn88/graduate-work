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

    // console.log('data=', data);

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
        [inputVal, setInputVal] = useState(false);

    // console.log('inputVal', inputVal);

    useEffect(() => {
        setInputVal(
            Array.isArray(data) && data.length > 0 && data?.map(({ number }) => number)
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

        async function edit(product, value) {
            const updated = Object.assign({}, product, { number: value });

            try {
                mutate(changeDataEdit(product.id, updated));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            } finally {
                null;
            }
        }

        async function changeDataEdit(id, updated) {
            try {
                const response = await fetch(`/api/store/basket/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updated)
                });
                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);

                return data?.map(item =>
                    item.id === id ? updated : item
                )


            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        function handleAddToOrder() {
            return addToOrder();
        }

        async function addToOrder() {

            try {
                mutate(changeDataAdd());
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        async function changeDataAdd() {
            try {
                const response = await fetch(`/api/store/order`, {
                    method: 'POST',
                });
                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);

                return [];

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            }
        }



        return (
            (data.length > 0)
                ? inputVal && <Flex flexDirection={'column'} alignItems={'center'} gap={'20px'}>
                    <ButtonGroup display={'flex'} alignItems={'baseline'} gap={'1vw'} flexDirection={flexDirection}>

                        <ModalWindowBlur
                            buttonText={'Подтвердить заказ'}
                            buttonColorScheme={'blue'}
                            width={'167px'}
                        >
                            <NotificationConfirmTheOrder handleAddToOrder={handleAddToOrder} />
                        </ModalWindowBlur>

                        <ModalWindowBlur
                            buttonText={'Очистить корзину'}
                            buttonColorScheme={'blue'}
                            width={'167px'}>
                            <NotificationProductRemoved del={del} />
                        </ModalWindowBlur>

                    </ButtonGroup>
                    <Box>Общая сумма заказа:&#160;
                        {data.map(({ price, number }) => (price * number)).reduce((sum, current) => sum + current, 0).toFixed(2)}
                        &#160;&#8381;
                    </Box>
                    <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                        {data.map((product, productArrIndex) => {

                            const { id, name, price, category, description, quantity, image, number } = product;

                            function handleDelProduct() {
                                return del(id);
                            }

                            return (<Flex key={productArrIndex} flexDirection={'column'} alignItems={'center'} flexGrow={'1'}>
                                <Box>Выбрано для заказа: {number}</Box>
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
                                    <Flex alignItems={'baseline'} gap={'1vw'} flexDirection={flexDirection}>

                                        <Button colorScheme='blue' width={'180px'} onClick={() => edit(product, +inputVal[productArrIndex])}>Изменить количество</Button>

                                        <ModalWindowBlur
                                            buttonText={'Удалить товар'}
                                            buttonColorScheme={'blue'}
                                            width={'180px'}
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
                    <ButtonGroup flexDirection={flexDirection} gap={'1vw'} alignItems={'baseline'}>
                        <Button
                            as={Link}
                            href={'/store'}
                            colorScheme='blue'
                            w={'163px'}
                        >Сувенирная лавка
                        </Button>
                        <Button
                            as={Link}
                            href={'/orders'}
                            colorScheme='blue'
                            w={'163px'}
                        >Активные заказы
                        </Button>
                    </ButtonGroup>
                </Flex>
        )
    }
}

function NotificationConfirmTheOrder({ onClose, handleAddToOrder }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            <Box textAlign={'center'}>Подтверждаете заказ?</Box>

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}

            >
                <Button
                    colorScheme='blue'
                    w={'80px'}
                    onClick={() => {
                        onClose();
                        handleAddToOrder();
                    }}>Да
                </Button>
                <Button
                    colorScheme='blue'
                    w={'80px'}
                    onClick={() => {
                        onClose();
                    }}>Отмена
                </Button>
            </Flex>
        </Flex>)
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