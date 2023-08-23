import { Box, Flex, Button, Input, chakra, Grid, Select } from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons';
import { Fragment } from 'react';
import { textFontSize } from '../displayParameters/fontParameters';
import { AddNewAccount } from './LoginButton';
import roles from '../data/roles';
import ModalWindowBlur from '../components/modalwindows/ModalWindowBlur';
import { flexDirection } from '../displayParameters/flexParameters';
import GetData from '../components/GetData';
import UserAdditionalInformation from '../components/UserAdditionalInformation';


export default function UserDataFragment({ columns, data, editData, delData, inputPlaceholder, inputVal, setInputVal, selectedForEdit, setSelectedForEdit, API }) {

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
                                    {roles.map(role =>

                                        <option key={role} value={role}>{role}</option>
                                    )}
                                </Select>
                                    <Button onClick={() => editData(data.id, colomn.setVal(inputVal))}><CheckIcon /></Button>
                                    <Button onClick={() => setSelectedForEdit({ userId: '', colomn: '', nameInBase: '' })}><CloseIcon /></Button>
                                </Box>

                                : <Box>
                                    <Input
                                        type='text'
                                        placeholder={inputPlaceholder}
                                        value={inputVal}
                                        onChange={evt => setInputVal(evt.target.value)}
                                        onKeyDown={(evt) =>
                                            (evt.keyCode === 13)
                                                ? editData(data.id, colomn.setVal(inputVal))
                                                : null
                                        }
                                        fontSize={textFontSize}
                                    />
                                    <Button onClick={() => editData(data.id, colomn.setVal(inputVal))}><CheckIcon /></Button>
                                    <Button onClick={() => setSelectedForEdit({ userId: '', colomn: '', nameInBase: '' })}><CloseIcon /></Button>
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

                                : colomn?.getVal(data)

                        }
                        {'provider' === colomn.nameInBase
                            ? <AddNewAccount />
                            : null
                        }
                        {'additionalInformation' === colomn.nameInBase
                            ? <ModalWindowBlur buttonText={'Открыть'} buttonColorScheme={'gray'}>
                                <GetData url={API + 'account/' + data.id}>
                                    <UserAdditionalInformation />
                                </GetData>
                            </ModalWindowBlur>
                            : null
                        }
                        {'actions' === colomn.nameInBase
                            ? <ModalWindowBlur buttonText={'Удалить'} buttonColorScheme={'gray'}>
                                <DelUser delData={delData} id={data.id} />
                            </ModalWindowBlur>
                            : null
                        }
                    </Flex>
                </Fragment>
            ))}
        </Grid>
    </>
}

function DelUser({ delData, id, onClose }) {
    return <>
        <Flex
            fontSize={textFontSize}
            flexDirection={'column'}
            alignItems={'center'}
            gap={'15px'}
        >
            <Box>Вы действительно хотите удалить этого пользователя?</Box>
            <Flex flexDirection={flexDirection} gap={'5vw'}>
                <Button onClick={() => { delData(id); onClose() }}>Да</Button>
                <Button onClick={() => onClose()}>нет</Button>
            </Flex>
        </Flex>
    </>
}