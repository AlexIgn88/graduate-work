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


        //Сделать универсальным, проработать, вынести отдельно- 
        return <>
            <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                {data.map(({ id, name, price, category, description, quantity, image }, productArrIndex) => {

                    // console.log('productArrIndex', productArrIndex);

                    return (<Card maxW='sm' key={name} alignItems={'center'}>
                        <CardBody>
                            <Image
                                src={image}
                                alt={name}
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{name}</Heading>
                                {/* <Text>
                                    {category}
                                </Text> */}
                                <Text>
                                    {description}
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    {price} &#8381;
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    Всего в наличии: {quantity}
                                </Text>
                                {session && <Box color='blue.600' fontSize='2xl'>
                                    Укажите количество:
                                    <NumberInput
                                        step={1}
                                        defaultValue={0}
                                        // defaultValue={+inputVal[productArrIndex]}
                                        min={0}
                                        max={quantity}
                                    >
                                        <NumberInputField
                                            value={+inputVal[productArrIndex]}
                                            onChange={evt => {
                                                let inputValue = +evt.currentTarget.value;

                                                // console.log('inputValue=', inputValue);

                                                switch (true) {
                                                    case inputValue > quantity: inputValue = quantity;
                                                        break;
                                                    case inputValue < 0: inputValue = 0;
                                                        break;
                                                    default: break;
                                                }

                                                setInputVal(inputVal.with(productArrIndex, inputValue));
                                            }}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper className="plus" onClick={
                                                (evt) => {
                                                    {
                                                        const inputValue = evt.currentTarget.closest('.chakra-numberinput').querySelector('input').value;
                                                        // console.log('inputValue=', inputValue);
                                                        setInputVal(inputVal.with(productArrIndex, inputValue));
                                                    }
                                                }
                                            }
                                            />

                                            <NumberDecrementStepper className="minus" onClick={
                                                (evt) => {
                                                    {
                                                        const inputValue = evt.currentTarget.closest('.chakra-numberinput').querySelector('input').value;
                                                        // console.log('inputValue=', inputValue);
                                                        setInputVal(inputVal.with(productArrIndex, inputValue));
                                                    }
                                                }
                                            }
                                            />
                                        </NumberInputStepper>
                                    </NumberInput>


                                </Box>}
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2' flexDirection={flexDirection}>
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
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)
                })}
            </Flex>


            {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        </>
    }
}