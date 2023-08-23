import { Box, Flex, Skeleton, Stack, Button } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import ProductCard from '../components/ProductCard';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';
import Link from 'next/link';
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
        [inputVal, setInputVal] = useState(false);

    // console.log('inputVal', inputVal);

    const [noProduct, setNoProduct] = useState(false);

    // console.log('noProduct=', noProduct);

    useEffect(() => {
        setInputVal(Array.isArray(data) && data.length > 0 && Array(data?.length)?.fill(1));
    }, [data]);

    const handleOutsideClick = () => {
        setNoProduct(false);
    };

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

                if (json.noProduct) {
                    setNoProduct(true);
                    return data;
                } else {
                    return data;
                }


            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            }
        }


        return (
            inputVal && <Flex flexDirection={'column'} alignItems={'center'} gap={'10px'} onClick={handleOutsideClick}>
                <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'} width={'100%'}>
                    {data.map(({ id, name, price, category, description, quantity, image }, productArrIndex) => {

                        function handleClick() {
                            return addToBasket(currentUserId, id, productArrIndex, +inputVal[productArrIndex]);
                        }

                        return (<Flex key={productArrIndex} flexDirection={'column'} alignItems={'center'} flexGrow={'1'}>
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
                                            ? <NotificationProductAddedToTheBasket noProduct={noProduct} setNoProduct={setNoProduct} />
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
            </Flex>)
    }
}

function NotificationProductAddedToTheBasket({ onClose, noProduct, setNoProduct }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            {!noProduct
                ? <Box textAlign={'center'}>Товар добавлен в корзину</Box>
                : <Box textAlign={'center'}>Выбранное Вами количество товара больше, чем есть на складе</Box>
            }

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}

            >
                <Button
                    as={Link}
                    href={'/basket'}
                    colorScheme='blue'
                    onClick={() => setNoProduct(false)}
                >Перейти к корзине
                </Button>
                <Button
                    colorScheme='blue'
                    onClick={() => {
                        onClose();
                        setNoProduct(false);
                    }}>Продолжить покупки
                </Button>
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