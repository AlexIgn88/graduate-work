import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import UserDataFragment from '../components/UserDataFragment';
import { FcUnlock } from "react-icons/fc";
import { textFontSize } from '../displayParameters/fontParameters';


export default function UserAdditionalInformation({ data, mutate }) {

    const columns = [
        { name: 'userId', nameInBase: 'userId', getVal: ({ userId }) => userId },
        { name: 'provider', nameInBase: 'provideInfo', getVal: ({ provider }) => provider },
        { name: 'email', nameInBase: 'email', getVal: ({ email }) => email },

    ];

    if (!data) return (
        <Stack>
            <Skeleton height='200px' />
        </Stack>)

    if (data?.error) return <Flex justifyContent={'center'} color={'red'}>{data.error}</Flex>


    if (data && (!data?.error) && data.length === 0) return (
        <Flex
            fontSize={textFontSize} alignItems={'center'} flexDirection={'column'} gap={'10px'}
        >
            <Flex alignItems={'center'} >
                <FcUnlock />&#160;Информация засекречена&#160;<FcUnlock />
            </Flex>
            <Box textAlign={'center'}>Необходим более высокий уровень допуска</Box>
        </Flex>)
    if (data && (!data?.error)) return <>
        <Box>Дополнительная информация</Box>
        {data.map(user =>
            <Box fontSize={textFontSize} key={user.id}>
                <UserDataFragment
                    columns={columns}
                    data={user}
                // editData={editData}
                // delData={delData}
                // inputPlaceholder={'Напишите тут'}
                // inputVal={inputVal}
                // setInputVal={setInputVal}
                // selectedForEdit={selectedForEdit}
                // setSelectedForEdit={setSelectedForEdit}
                // API={API}
                />
            </Box>
        )}


        {/* <pre>{JSON.stringify(data, null, '\t')}</pre> */}
    </>

}