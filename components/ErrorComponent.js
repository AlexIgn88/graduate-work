import { Flex } from "@chakra-ui/react";


export default function ErrorComponent({ error }) {

    return <Flex justifyContent={'center'} color={'red'}>{error}</Flex>
}