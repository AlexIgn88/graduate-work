import {
    Box, Flex, Button, Input, chakra, Grid, Select,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment } from 'react';
import { textFontSize } from '../displayParameters/fontParameters';
import { AddNewAccount } from './LoginButton';


export default function UserDataFragment({ columns, data, editData, inputPlaceholder, inputVal, setInputVal, selectedForEdit, setSelectedForEdit }) {

    return <>
        <Grid
            p={'20px'}
            templateColumns="repeat(2, 1fr)"
            gap={5}
            border={'1px solid black'}
            borderRadius={'5px'}>

            {columns.map(colomn => (
                <Fragment key={colomn.nameInBase}>
                    <Box><chakra.span color={'#feb849'}>{colomn.name}</chakra.span> &#160;</Box>
                    <Flex flexDirection={'row'} gap={'20px'} alignItems={'baseline'}>
                        {data?.id === selectedForEdit?.userId && colomn?.nameInBase === selectedForEdit?.nameInBase
                            ? ('role' === colomn.nameInBase

                                ? <Box> <Select
                                    name={colomn.nameInBase}
                                    placeholder='Select option'
                                    onChange={evt => {
                                        setInputVal(evt.target.value);
                                    }}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                    <option value="moderator">moderator</option>
                                    <option value="banned">banned</option>
                                </Select>
                                    <Button onClick={() => editData(data.id, colomn.setVal(inputVal))}><CheckIcon /></Button>
                                    <Button onClick={() => setSelectedForEdit({ userId: null, colomn: null, nameInBase: null })}><CloseIcon /></Button>
                                </Box>

                                : <Box>
                                    <Input
                                        type='text'
                                        placeholder={inputPlaceholder}
                                        value={inputVal}
                                        onInput={evt => setInputVal(evt.target.value)}
                                        onKeyDown={(evt) =>
                                            (evt.keyCode === 13)
                                                ? editData(data.id)
                                                : null
                                        }
                                        fontSize={textFontSize}
                                    />
                                    <Button onClick={() => editData(data.id, colomn.setVal(inputVal))}><CheckIcon /></Button>
                                    <Button onClick={() => setSelectedForEdit({ userId: null, colomn: null, nameInBase: null })}><CloseIcon /></Button>
                                </Box>
                            )

                            : colomn.setVal
                                ? <Flex alignItems={'center'}>
                                    <chakra.span>{colomn.getVal(data)}</chakra.span>&#160;
                                    <Button onClick={() => {
                                        setInputVal(colomn.getVal(data));
                                        setSelectedForEdit({ userId: data.id, colomn: colomn.name, nameInBase: colomn.nameInBase });
                                    }}><EditIcon />
                                    </Button>
                                </Flex>

                                : colomn.getVal(data)

                        }
                        {'provider' === colomn.nameInBase
                            ? <AddNewAccount />
                            : null
                        }
                    </Flex>
                </Fragment>
            ))}
        </Grid>
    </>
}