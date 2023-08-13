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


export default function ProductCard({ id, name, price, category, description, quantity, image, inputVal, setInputVal, addProduct, currentUserId, productArrIndex }) {


    return <Card maxW='sm' alignItems={'center'} flexGrow={'1'}>
        <CardBody>
            <Image
                src={image}
                alt={name}
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
                <Heading size='md'>{name}</Heading>
                <Text>
                    {description}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    {price} &#8381;
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    Всего в наличии: {quantity}
                </Text>
                <Box color='blue.600' fontSize='2xl'>
                    Укажите количество:
                    <NumberInput
                        step={1}
                        defaultValue={0}
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
                </Box>
            </Stack>
        </CardBody>
        {/* <Divider />
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
        </CardFooter> */}
    </Card>
}