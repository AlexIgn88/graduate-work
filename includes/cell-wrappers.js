import { Image, Avatar } from '@chakra-ui/react';

export function Img({ value }) {
    return <Image className="" src={value} alt={value} />;
}

export function UserAva({ value }) {
    return <Avatar
        name={value}
        src={value}
        width={'150px'}
        height={'150px'}
    />;
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