import { Box, Flex, Skeleton, Stack, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { flexDirection } from '../displayParameters/flexParameters';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';


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
        defaultinputVal = Array(data?.length || numberOfSkeletons)?.fill(0),
        [inputVal, setInputVal] = useState(defaultinputVal);

    // console.log('inputVal', inputVal);

    useEffect(() => {
        setInputVal(
            // Array(data?.length)?.fill(0)
            data?.map(({ number }) => number) || Array(numberOfSkeletons)?.fill(0)
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




        // async function addToBasket(currentUserId, productId, productArrIndex, quantity) {

        //     const newProduct = {
        //         userId: currentUserId,
        //         productId: productId,
        //         quantity: quantity
        //     };

        //     try {
        //         mutate(changeDataAdd(newProduct));
        //         // setInputVal(defaultinputVal);
        //         // const inputValue = evt.currentTarget.closest('.chakra-card__body').querySelector('input').value;
        //         // console.log('inputValue=', inputValue);
        //         // setInputVal(inputVal.with(productArrIndex, inputValue));

        //         // setInputVal(inputVal.with(productArrIndex, 0));

        //     } catch (error) {
        //         console.log(`FILE: ${__filename}\nERROR:`, error);
        //     }
        //     // finally {
        //     //     onClose();
        //     // }
        // }

        // async function changeDataAdd(newProduct) {
        //     try {
        //         const response = await fetch('/api/store/basket/', {
        //             method: 'POST',
        //             body: JSON.stringify(newProduct)
        //         });
        //         // console.log('adduser response', response);
        //         if (!response.ok) throw new Error('ошибка');
        //         const json = await response.json();
        //         // console.log('json', json);
        //         return data;
        //     } catch (error) {
        //         console.log(`FILE: ${__filename}\nERROR:`, error)
        //     }
        // }




        return (
            (data.length > 0)
                ? (inputVal[0] > 0) && <Flex flexDirection={'column'} alignItems={'center'} gap={'20px'}>
                    <ButtonGroup display={'flex'} alignItems={'baseline'} gap={'1vw'} flexDirection={flexDirection}>
                        <Button colorScheme='blue' width={'167px'}>Подтвердить заказ</Button>
                        <Button colorScheme='blue' width={'167px'}>Очистить корзину</Button>
                    </ButtonGroup>
                    <Box>Общая сумма заказа:&#160;
                        {data.map(({ price, number }) => (price * number)).reduce((sum, current) => sum + current, 0)}
                        &#160;&#8381;
                    </Box>
                    <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                        {data.map(({ id, name, price, category, description, quantity, image, number }, productArrIndex) =>
                            <Flex key={productArrIndex} flexDirection={'column'} alignItems={'center'} flexGrow={'1'}>
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

                                    {/* {session
                                ? <Button
                                    variant='solid'
                                    colorScheme='blue'
                                    onClick={() => addToBasket(currentUserId, id, productArrIndex, +inputVal[productArrIndex])}
                                >
                                    Добавить в корзину
                                </Button>
                                : <Button variant='solid' colorScheme='blue'>
                                    Купить сейчас
                                </Button>} */}

                                    <Flex flexDirection={'column'}>
                                        <Button colorScheme='blue'>Удалить товар</Button>
                                    </Flex>

                                </ProductCard>
                            </Flex>
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