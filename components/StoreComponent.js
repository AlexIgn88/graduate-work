// import columnsForUserAccount from '../data/columnsForUserAccount';
import {
    Box, Flex, Skeleton, Stack, Image, Heading, Text, Divider, ButtonGroup, Button,
    Card, CardHeader, CardBody, CardFooter,
} from "@chakra-ui/react";
// import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment, useState } from 'react';
// import UserDataFragment from '../components/UserDataFragment';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
// import { HeadingForPage } from '../components/ElemsForPages';
import { marginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import { HeadingForPage } from '../components/ElemsForPages';


export default function StoreComponent({ data, mutate }) {

    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    const numberOfSkeletons = 5;

    if (!data) return (
        <Stack flexDirection={flexDirection}>
            {[...Array(numberOfSkeletons)].map((_, i) => <Skeleton key={i} w={'384px'} h={'735px'} />)}
        </Stack>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        //Сделать универсальным, проработать, вынести отдельно- 
        return <>
            <Flex gap={'20px'} flexDirection={flexDirection} flexWrap={'wrap'}>
                {data.map(({ name, price, description, quantity, image }) =>
                    <Card maxW='sm' key={name} alignItems={'center'}>
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
                                <Text color='blue.600' fontSize='2xl'>
                                    Укажите количество:
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2' flexDirection={flexDirection}>
                                {session
                                    ? <Button variant='solid' colorScheme='blue'>
                                        Добавить в корзину
                                    </Button>
                                    : <Button variant='solid' colorScheme='blue'>
                                        Купить сейчас
                                    </Button>}
                            </ButtonGroup>
                        </CardFooter>
                    </Card>)}
            </Flex>


            {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
        </>
    }
}