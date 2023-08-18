import {
    Box, Stack, Heading, Text, Divider, ButtonGroup,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Card, CardBody, CardFooter,
} from "@chakra-ui/react";
import Image from 'next/image';
import { flexDirection } from '../displayParameters/flexParameters';


export default function ProductCard({ children, id, name, price, category, description, quantity, image, inputVal, setInputVal, productArrIndex }) {

    return <Card maxW='sm' alignItems={'center'} flexGrow={'1'}>
        <CardBody display={'flex'} flexDirection={'column'}>
            <Image
                src={image}
                alt={name}
                width={500}
                height={500}
                priority={true}
                style={{ borderRadius: '10px' }}
            />
            <Stack mt='6' spacing='3' flexGrow={'1'} justifyContent={'flex-end'}>
                <Heading size='md'>{name}</Heading>
                <Text>
                    {description}
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    {price.toFixed(2)} &#8381;
                </Text>
                <Text color='blue.600' fontSize='2xl'>
                    Всего в наличии: {quantity}
                </Text>
                <Box color='blue.600' fontSize='2xl'>
                    Укажите количество:
                    <NumberInput
                        step={1}
                        defaultValue={+inputVal[productArrIndex] ? +inputVal[productArrIndex] : 0}
                        min={0}
                        max={quantity}
                    >
                        <NumberInputField
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
                                        const inputValue = +evt.currentTarget.closest('.chakra-numberinput').querySelector('input').value;
                                        // console.log('inputValue=', inputValue);
                                        setInputVal(inputVal.with(productArrIndex, inputValue));
                                    }
                                }}
                            />
                            <NumberDecrementStepper className="minus" onClick={
                                (evt) => {
                                    {
                                        const inputValue = +evt.currentTarget.closest('.chakra-numberinput').querySelector('input').value;
                                        // console.log('inputValue=', inputValue);
                                        setInputVal(inputVal.with(productArrIndex, inputValue));
                                    }
                                }}
                            />
                        </NumberInputStepper>
                    </NumberInput>
                </Box>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2' flexDirection={flexDirection}>
                {children}
            </ButtonGroup>
        </CardFooter>
    </Card>
}