import { Box, Flex, Skeleton, Stack, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import ErrorComponent from '../components/ErrorComponent';
import { useSession } from 'next-auth/react';
import { textFontSize } from '../displayParameters/fontParameters';
import { flexDirection } from '../displayParameters/flexParameters';
// import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';


export default function OrdersComponent({ data, mutate }) {

    console.log('data=', data);

    //Константы для получения сессии и данных о вошедшем пользователе
    const
        { data: session } = useSession(),
        currentUserId = session?.user?.id,
        currentUserName = session?.user?.name,
        currentUserRole = session?.user?.role;

    //Константа для определения количества скелетонов
    const numberOfSkeletons = 5;

    //useState для управляемых инпутов
    // const
    //     [inputVal, setInputVal] = useState(false);

    // console.log('inputVal', inputVal);

    // useEffect(() => {
    //     setInputVal(
    //         Array.isArray(data) && data.length > 0 && data?.map(({ number }) => number)
    //     );
    // }, [data]);


    if (!data) return (
        <Stack flexDirection={flexDirection}>
            {[...Array(numberOfSkeletons)].map((_, i) => <Skeleton key={i} w={'384px'} h={'735px'} />)}
        </Stack>
    )

    if (data?.error) return <ErrorComponent error={data?.error} />

    if (data && (!data?.error)) {

        // console.log('inputVal', inputVal);


        return <pre>{JSON.stringify(data, null, '\t')}</pre>

    }
}