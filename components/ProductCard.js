import {
    Box, Stack, Heading, Text, ButtonGroup,
    NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
    Card, CardBody, CardFooter,
} from "@chakra-ui/react";
import Image from 'next/image';
import { flexDirection } from '../displayParameters/flexParameters';


export default function ProductCard({ children, id, name, price, category, description, quantity, image, inputVal, setInputVal, productArrIndex }) {

    return <Card maxW='sm' alignItems={'center'} flexGrow={'1'} border={'1px solid #E8E8E8'} background={'#E8E8E8'}>
        <CardBody display={'flex'} flexDirection={'column'} alignItems={'center'}>
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
                <Text color='Black.600' fontSize='2xl'>
                    {price.toFixed(2)} &#8381;
                </Text>
                <Text color='Black.600' fontSize='2xl'>
                    Всего в наличии: {quantity}
                </Text>
                <Box color='Black.600' fontSize='2xl'>
                    Укажите количество:
                    <NumberInput
                        step={1}
                        defaultValue={+inputVal[productArrIndex]}
                        min={0}
                        max={quantity}
                        borderRadius={'0.375rem'}
                        border={'1px solid gray'}
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
        <CardFooter>
            <ButtonGroup
                spacing='2'
                flexDirection={flexDirection}
            >
                {children}
            </ButtonGroup>
        </CardFooter>
    </Card>
}