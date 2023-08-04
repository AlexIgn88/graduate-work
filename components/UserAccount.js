import { signIn } from 'next-auth/react';
import columnsForUserAccount from '../data/columnsForUserAccount';

import EditableMyAccount from '../components/EditableMyAccount';

import {
    Box, Flex, Spacer, Heading, Button, ButtonGroup, Input,
    Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider,
    Skeleton, SkeletonCircle, SkeletonText, Stack
} from "@chakra-ui/react";
import { h1HeadersFontSize, h2HeadersFontSize, h3HeadersFontSize, textFontSize } from '../displayParameters/fontParameters';
import { marginParameters } from '../displayParameters/marginParameters';
import { flexDirection } from '../displayParameters/flexParameters';
import { HeadingForPage } from '../components/ElemsForPages';

export default function UserAccount({ data, mutate }) {

    // console.log('data', data);

    if (!data) (
        <Stack m={marginParameters}>
            <Skeleton height='300px' />
            <Skeleton height='300px' />
        </Stack>)

    if (data) {

        const { user, accouts } = data;

        const
            providersStr = accouts.map(accouns => accouns.provider).join(', '),
            emailStr = accouts.map(accouns => accouns.email).join(', '),
            userEmail = user.email || emailStr;

        const formattedUser = Object.assign({}, user, { provider: providersStr }, { email: userEmail });

        //Не забыть:

        //EditableMyAccount выкинуть. Новый REST-компонент для user-аккаунта пишется прямо здесь ниже
        //mutate не забыть!

        //функции запросы к API на редактирование см в AllTopicsComponent
        //НО удаление и добавление не делать! 
        //Пользователю можно будет пока только редактировать nickname и 
        //ПОЗЖЕ строку userAva (добавить это поле в базу), указывая интернет-путь к своей картинке 

        //думаю, сделать новый REST-компонент карточками Chakra - выбрать-подумать!
        //карточки мэпим, и выдаем. Как с таблицей
        //или просто дивы-боксы Box
        //+см другие компоненты Чакры
        return <>

            <Box>
                {/* EditableMyAccount выкинуть. Новый REST-компонент для user-аккаунта пишется прямо здесь ниже вместо этого Box
                
                что-то вроде {columns?.map(({ name, getVal, setVal }, columN) => (
                    ни фильтров, ни сортировки, ни удаления и добавления. Все будет просто
                    НО не забыть mutate!!!! Редактирование есть!!!
                */}
                <Box
                >
                    {
                        // Array.isArray(userAccountData) && 
                        <EditableMyAccount
                            columns={columnsForUserAccount}
                            data={[formattedUser]}
                        // onAdd={onAdd}
                        // onDelete={onDelete}
                        // onEdit={onEdit}
                        />}
                </Box>
                <Button
                    as={'span'}
                    colorScheme='gray'
                    title='Добавить дополнительный аккаунт'
                    onClick={() => signIn()}
                >Добавить аккаунт
                </Button>


                {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(user, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(accouts, null, '\t')}</pre> */}
            </Box>


            {/* data= {data && <pre>{JSON.stringify(data, null, '\t')}</pre>} */}
            {/* userAccountData= {userAccountData && <pre>{JSON.stringify(userAccountData, null, '\t')}</pre>} */}
        </>
    }
}
