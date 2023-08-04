import { signIn } from 'next-auth/react';
import columnsForUserAccount from '../data/columnsForUserAccount';
import {
    Box, Flex, Button, Input, chakra, Grid,
    Skeleton, Stack,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment, useState } from 'react';
import { textFontSize } from '../displayParameters/fontParameters';


export default function UserAccount({ data, mutate }) {

    // console.log('data', data);

    const
        [userDataInputVal, setUserDataInputVal] = useState(''),
        [editUserData, setEditUserData] = useState(null);

    if (!data) return (
        <Stack>
            <Skeleton height='300px' />
        </Stack>)

    if (data?.error) return <Flex justifyContent={'center'} color={'red'}>{data.error}</Flex>

    if (data && (!data?.error)) {

        const { user, accouts } = data;

        const
            providersStr = accouts.map(accouns => accouns?.provider).join(', '),
            emailStr = accouts.map(accouns => accouns?.email).join(', '),
            userEmail = user?.email || emailStr;

        const formattedUser = Object.assign({}, user, { provider: providersStr }, { email: userEmail }),

            updatedUser = {};

        async function editData() {
            Object.assign(updatedUser, { nickname: userDataInputVal });
            setUserDataInputVal('');
            setEditUserData(null);
            // console.log('updatedUser=', updatedUser);
            try {
                mutate(changeDataEdit(updatedUser, user));
            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error)
            } finally {
                null;
            }
        }

        async function changeDataEdit(obj, user) {
            try {
                const response = await fetch(`/api/apiuser/user/${user.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(obj)
                });
                // console.log('changeDataEdit response', response);
                if (!response.ok) throw new Error('ошибка');
                const json = await response.json();
                // console.log('json', json);
                return Object.assign({}, data, { nickname: userDataInputVal });

            } catch (error) {
                console.log(`FILE: ${__filename}\nERROR:`, error);
            }
        }

        return <>

            <Box>
                <Grid mt={'40px'} p={'20px'} templateColumns="repeat(2, 1fr)" gap={5} border={'1px solid black'} borderRadius={'5px'}>
                    {columnsForUserAccount.map(colon => (
                        <Fragment key={colon.name}>
                            <Box><chakra.span color={'#feb849'}>{colon.name}</chakra.span> &#160;</Box>
                            <Flex flexDirection={'column'} gap={'20px'} alignItems={'baseline'}>
                                {colon.name === editUserData
                                    ? <Box>
                                        <Input
                                            type='text'
                                            name='nickname'
                                            placeholder={'Ваш ник на форуме'}
                                            value={userDataInputVal}
                                            onInput={evt => setUserDataInputVal(evt.target.value)}
                                            onKeyDown={(evt) =>
                                                (evt.keyCode === 13)
                                                    ? editData()
                                                    : null
                                            }
                                            fontSize={textFontSize}
                                        />
                                        <Button onClick={() => editData()}><CheckIcon /></Button>
                                        <Button onClick={() => setEditUserData(null)}><CloseIcon /></Button>
                                    </Box>

                                    : colon.setVal
                                        ? <Flex alignItems={'center'}>
                                            <chakra.span>{colon.getVal(formattedUser)}</chakra.span>&#160;
                                            <Button onClick={() => {
                                                setUserDataInputVal(colon.getVal(formattedUser));
                                                setEditUserData(colon.name);
                                            }}><EditIcon />
                                            </Button>
                                        </Flex>

                                        : colon.getVal(formattedUser)

                                }
                                {'Аккаунты' === colon.name
                                    ? <AddNewAccount />
                                    : null
                                }
                            </Flex>
                        </Fragment>
                    ))}
                </Grid>

                {/* <pre>{JSON.stringify(formattedUser, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(user, null, '\t')}</pre> */}
                {/* <pre>{JSON.stringify(accouts, null, '\t')}</pre> */}
            </Box>
        </>
    }
    // if (data) return <pre>{JSON.stringify(data, null, '\t')}</pre>
}


function AddNewAccount() {

    return (
        <Button
            as={'span'}
            colorScheme='gray'
            mb={'2vw'}
            title='Добавить дополнительный аккаунт'
            onClick={() => signIn()}
        >Добавить аккаунт
        </Button>
    )
}
