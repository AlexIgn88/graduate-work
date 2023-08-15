import { Box, Flex, Skeleton, Stack, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import ProductCard from '../components/ProductCard';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';
import NextLink from 'next/link';
import ContactInfo from '../components/ContactInfo';
import LoginButton from '../components/LoginButton';


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

    useEffect(() => {
        setInputVal(Array(data?.length)?.fill(0));
    }, [data]);

    // console.log('inputVal', inputVal);

    if (!data) return (
        <Stack flexDirection={flexDirection}>
            {[...Array(numberOfSkeletons)].map((_, i) => <Skeleton key={i} w={'384px'} h={'735px'} />)}
        </Stack>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        // console.log('data?.length', data?.length);

        async function addToBasket(currentUserId, productId, productArrIndex, quantity) {

            const newProduct = {
                userId: currentUserId,
                productId: productId,
                quantity: quantity
            };

            try {
                mutate(changeDataAdd(newProduct));
                // setInputVal(defaultinputVal);
                // const inputValue = evt.currentTarget.closest('.chakra-card__body').querySelector('input').value;
                // console.log('inputValue=', inputValue);
                // setInputVal(inputVal.with(productArrIndex, inputValue));

                // setInputVal(inputVal.with(productArrIndex, 0));

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        async function changeDataAdd(newProduct) {
            try {
                const response = await fetch(`/api/store/basket/${newProduct.productId}`, {
                    method: 'POST',
                    body: JSON.stringify(newProduct)
                });
                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);
                return data;
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            }
        }


        return <>
            <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                {data.map(({ id, name, price, category, description, quantity, image }, productArrIndex) => {

                    function handleClick() {
                        return addToBasket(currentUserId, id, productArrIndex, +inputVal[productArrIndex]);
                    }

                    return (<Flex key={productArrIndex} flexDirection={'column'} alignItems={'center'}>
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

                            {session
                                ? <ModalWindowBlur
                                    buttonText={'Добавить в корзину'}
                                    buttonColorScheme={'blue'}
                                    onClick={+inputVal[productArrIndex] !== 0 ? handleClick : false}
                                >
                                    {+inputVal[productArrIndex] !== 0
                                        ? <NotificationProductAddedToTheBasket />
                                        : <NotificationProductQuantityIsNull />
                                    }

                                </ModalWindowBlur>

                                : <ModalWindowBlur
                                    buttonText={'Купить сейчас'}
                                    buttonColorScheme={'blue'}
                                >
                                    <BuyNotLoggedIn />
                                </ModalWindowBlur>
                            }

                        </ProductCard>
                    </Flex>)
                }
                )}
            </Flex>
        </>
    }
}

function NotificationProductAddedToTheBasket({ onClose }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            <Box>Товар добавлен в корзину</Box>

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}

            >
                <Button
                    as={NextLink}
                    href={'/basket'}
                    colorScheme='blue'
                >Перейти к корзине
                </Button>
                <Button
                    colorScheme='blue'
                    onClick={() => {
                        onClose();
                    }}>Продолжить покупки</Button>
            </Flex>
        </Flex>)
}

function NotificationProductQuantityIsNull({ onClose }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            <Box>Укажите количество товара</Box>

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}

            >
                <Button
                    colorScheme='blue'
                    onClick={() => {
                        onClose();
                    }}>Закрыть
                </Button>
            </Flex>
        </Flex>)
}

function BuyNotLoggedIn({ onClose }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            <Box textAlign={'center'}>Для покупки, пожалуйста, войдите в свой аккаунт на сайте</Box>
            <LoginButton />

            <Box textAlign={'center'}>Также Вы можете купить товар, обратившись к менеджеру</Box>
            <ContactInfo />
            <Button
                colorScheme='blue'
                onClick={() => {
                    onClose();
                }}>Закрыть
            </Button>

        </Flex>)
}