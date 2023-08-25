import { Image, Avatar } from '@chakra-ui/react';

export function Img({ value }) {
    return <Image className="" src={value} alt={value} />;
}

export function UserAva({ name, value }) {
    return <Avatar
        name={name}
        src={value}
        width={'100px'}
        height={'100px'}
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