import { Box, Flex, Skeleton, Stack, Button, ButtonGroup, Text, Grid, Select } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import Link from 'next/link';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';


export default function OrdersComponent({ data, mutate }) {

    // console.log('data=', data);

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role,
        roleManager = 'manager' === session?.user?.role || 'admin' === session?.user?.role;

    //Константа для определения количества скелетонов
    const numberOfSkeletons = 6;

    const
        [inputVal, setInputVal] = useState(''),
        [selectedForEdit, setSelectedForEdit] = useState(false);

    const ordersGapsSeting = { base: '10px', sm: '20px' };

    const orderStatuses = [
        'заказ создан',
        'заказ собирают',
        'заказ готовится к отправке',
        'заказ передан в транспортную компанию',
        'заказ доставлен',
    ];

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

        async function del(orderId, productId, newTotalNumber) {
            const updatedProductQuantity = Object.assign({}, { quantity: newTotalNumber });

            try {
                mutate(changeDataDel(orderId));
                changeDataEdit(productId, updatedProductQuantity, 'product');
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            } finally {
                null;
            }
        }

        async function changeDataDel(orderId) {
            try {

                let response;

                orderId
                    ? response = await fetch(`/api/store/order/${orderId}`, {
                        method: 'DELETE',
                    })

                    : response = await fetch(`/api/store/order`, {
                        method: 'DELETE',
                    })

                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);

                if (orderId) {
                    return data?.filter(item => orderId !== +item?.orderId)
                } else {
                    return [];
                }

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        async function editData(id, inputVal) {
            const updated = Object.assign({}, { orderStatus: inputVal });
            try {
                mutate(changeDataEdit(id, updated, 'order'));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            } finally {
                setInputVal('');
                setSelectedForEdit(false);
            }
        }

        async function changeDataEdit(id, updated, table) {

            try {
                const response = await fetch(`/api/store/${table}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(updated)
                });
                // console.log('adduser response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);

                return data?.map(item =>
                    +item.orderId === +id ? Object.assign({}, item, updated) : item
                )

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }


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
                    {data.map(item => {

                        function handleDelOrder() {
                            return del(item.orderId, item.productId, item.totalNumber + item.number);
                        }

                        return (
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

                                    <Flex alignItems={'center'} gap={'10px'}>
                                        {selectedForEdit
                                            ? <Box>
                                                <Select
                                                    placeholder='Select option'
                                                    onChange={evt => {
                                                        setInputVal(evt.target.value);
                                                    }}
                                                >

                                                    {orderStatuses.map(status =>

                                                        <option key={status} value={status}>{status}</option>
                                                    )}

                                                </Select>
                                                <Button onClick={() => editData(item.orderId, inputVal)}><CheckIcon /></Button>
                                                <Button onClick={() => setSelectedForEdit(false)}><CloseIcon /></Button>
                                            </Box>
                                            : (
                                                <>
                                                    <Text>Статус заказа: {item.orderStatus}</Text>
                                                    {roleManager && (
                                                        <Button onClick={() => {
                                                            setSelectedForEdit(true);
                                                        }}>
                                                            <EditIcon />
                                                        </Button>
                                                    )}
                                                </>
                                            )
                                        }

                                    </Flex>
                                    <Box>Общая сумма заказа: {(item.price * item.number).toFixed(2)} &#8381;</Box>
                                    {roleManager && <Box>Покупатель: {item.userName}</Box>}
                                    {roleManager && <Box>Email: {item.email}</Box>}
                                    {roleManager && <Box>Категория товара: {item.category}</Box>}
                                    <Box>Наименование товара: {item.productName}</Box>
                                    {roleManager && <Box>Код товара: {item.productId}</Box>}
                                    {roleManager && <Box>Всего на складе: {item.totalNumber}</Box>}
                                    <Box>Заказано в количестве: {item.number}</Box>
                                    <Box>Цена товара: {(item.price).toFixed(2)} &#8381;</Box>
                                    <Box>
                                        <ModalWindowBlur
                                            buttonText={'Отменить заказ'}
                                            buttonColorScheme={'yellow'}
                                            width={'180px'}
                                        >
                                            <NotificationOrderRemoved del={handleDelOrder} />
                                        </ModalWindowBlur>
                                    </Box>
                                </Flex>
                            </Box>
                        )
                    }
                    )}
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
                        colorScheme='yellow'
                    >Сувенирная лавка
                    </Button>
                </Flex>
        )
    }
}

function NotificationOrderRemoved({ onClose, del }) {

    return (
        <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
            fontSize={textFontSize}
        >
            <Box textAlign={'center'}>Подтверждаете отмену заказа?</Box>

            <Flex
                flexDirection={flexDirection}
                gap={'1vw'}
            >
                <Button
                    colorScheme='yellow'
                    onClick={() => { del(); onClose() }}
                >Удалить
                </Button>
                <Button
                    colorScheme='yellow'
                    onClick={() => {
                        onClose();
                    }}>Отмена
                </Button>
            </Flex>
        </Flex>)
}