import { Heading, Text, Box, Flex, Image, List, ListItem, ListIcon, chakra } from '@chakra-ui/react';

// export function Img({ value }) {
//     return <img className="icon" src={`https://randomuser.me/api/portraits/thumb/men/${value}.jpg`} alt={'photo'} />;
// }

{/* <Image src={picture} alt={'picture'} w={picSize} h={picSize} /> */}

export function Img({ value }) {
    return <Image className="" src={value} alt={value} />;
}

export function Email({ value }) {
    return <a href={'mailto:' + value}>{value}</a>;
}

export function Phone({ value }) {
    return <a href={'tel:' + value}>{value}</a>
}

export function Site({ value }) {
    return <a href={'http://' + value}>{value}</a>;
}
