import {
    Box, Flex, Skeleton, Stack, Image, Heading, Text, Divider, ButtonGroup, Button,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Card, CardHeader, CardBody, CardFooter,
} from "@chakra-ui/react";
// import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
// import { HeadingForPage } from '../components/ElemsForPages';
// import { marginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import ProductCard from '../components/ProductCard';


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


    if (!data) return (
        <Stack flexDirection={flexDirection}>
            {[...Array(numberOfSkeletons)].map((_, i) => <Skeleton key={i} w={'384px'} h={'735px'} />)}
            {/* {new Array(numberOfSkeletons).fill(<Skeleton w={'384px'} h={'735px'} />)} */}
        </Stack>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        // console.log('inputVal', inputVal);

        async function addProduct(currentUserId, productId, productArrIndex, quantity) {

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
                setInputVal(inputVal.with(productArrIndex, 0));

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
            // finally {
            //     onClose();
            // }
        }

        async function changeDataAdd(newProduct) {
            try {
                const response = await fetch('/api/store/basket/', {
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
                {data.map(({ id, name, price, category, description, quantity, image }, productArrIndex) =>

                    <Flex key={name} flexDirection={'column'} alignItems={'center'}>
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
                            // addProduct={}
                            // currentUserId={}
                            productArrIndex={productArrIndex}
                        />

                        <Box>
                            <Box spacing='2' flexDirection={flexDirection}>
                                {session
                                    ? <Button
                                        variant='solid'
                                        colorScheme='blue'
                                        onClick={() => addProduct(currentUserId, id, productArrIndex, +inputVal[productArrIndex])}
                                    >
                                        Добавить в корзину
                                    </Button>
                                    : <Button variant='solid' colorScheme='blue'>
                                        Купить сейчас
                                    </Button>}
                            </Box>
                        </Box>

                    </Flex>

                )}
            </Flex>
            {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        </>
    }
}