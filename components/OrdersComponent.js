import { Box, Flex, Skeleton, Stack, Button, ButtonGroup, Text, Grid } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import Link from 'next/link';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';


export default function OrdersComponent({ data, mutate }) {

    console.log('data=', data);

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role,
        roleManager = 'manager' === session?.user?.role || 'admin' === session?.user?.role;

    //Константа для определения количества скелетонов
    const numberOfSkeletons = 6;

    //useState для управляемых инпутов
    // const
    //     [inputVal, setInputVal] = useState(false);

    // console.log('inputVal', inputVal);

    // useEffect(() => {
    //     setInputVal(
    //         Array.isArray(data) && data.length > 0 && data?.map(({ number }) => number)
    //     );
    // }, [data]);

    const ordersGapsSeting = { base: '10px', sm: '20px' };


    if (!data) return (
        <Grid
            templateColumns={{
                base: "repeat(1, 1fr)",
                '2xl': "repeat(3, 1fr)",
                xl: "repeat(2, 1fr)",
                lg: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                sm: "repeat(1, 1fr)"
            }}
            gap={5}
        >
            {[...Array(numberOfSkeletons)].map((_, i) => (
                <Box
                    key={i}
                    border={'1px solid black'}
                    borderRadius={'5px'}
                    p={'20px'}
                >
                    <Flex
                        flexDirection={'column'}
                        gap={ordersGapsSeting}
                    >
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </Flex>
                </Box>
            ))}
        </Grid>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        // console.log('inputVal', inputVal);


        return (
            (data.length > 0)
                ? <Grid
                    templateColumns={
                        (data.length > 1)
                            ? {
                                base: "repeat(1, 1fr)",
                                '2xl': "repeat(2, 1fr)",
                                xl: "repeat(2, 1fr)",
                                lg: "repeat(2, 1fr)",
                                md: "repeat(2, 1fr)",
                                sm: "repeat(1, 1fr)"
                            }
                            : {
                                base: "repeat(1, 1fr)",
                                '2xl': "repeat(1, 1fr)",
                                xl: "repeat(1, 1fr)",
                                lg: "repeat(1, 1fr)",
                                md: "repeat(1, 1fr)",
                                sm: "repeat(1, 1fr)"
                            }
                    }
                    gap={5}
                >

                    {data.map(item => (
                        <Box
                            key={item.orderId}
                            border={'1px solid black'}
                            borderRadius={'5px'}
                            p={'20px'}
                        >
                            <Flex
                                flexDirection={'column'}
                                gap={ordersGapsSeting}
                            >
                                {roleManager && <Box>Заказ № {item.orderId}</Box>}
                                <Box>Статус заказа: {item.orderStatus}</Box>
                                <Box>Общая сумма заказа: {(item.price * item.number).toFixed(2)} &#8381;</Box>
                                {roleManager && <Box>Покупатель: {item.userName}</Box>}
                                {roleManager && <Box>Email: {item.email}</Box>}
                                {roleManager && <Box>Категория товара: {item.category}</Box>}
                                <Box>Наименование товара: {item.productName}</Box>
                                {roleManager && <Box>Всего на складе: {item.totalNumber}</Box>}
                                <Box>Заказано в количестве: {item.number}</Box>
                                <Box>Цена товара: {(item.price).toFixed(2)} &#8381;</Box>
                            </Flex>
                        </Box>
                    ))}
                </Grid>
                : <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'20px'}>
                    {!roleManager
                        ? <Text textAlign={'center'}>
                            У Вас пока нет активных заказов. Для осуществления покупок перейдите, пожалуйста, на страницу Сувенирной лавки
                        </Text>
                        : <Text textAlign={'center'}>
                            Активные заказы отсутствуют
                        </Text>
                    }
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