import { UserAva } from '../includes/cell-wrappers';
import { Image } from '@chakra-ui/react';

const userColumns = [
    // { name: '', getVal: ({ image }) => <UserAva value={image} /> },
    { name: 'Фото', getVal: ({ image }) => <Image src={image} alt="avatar" borderRadius={'10px'} /> },
    { name: 'Имя', getVal: ({ name }) => name },
    { name: 'Почта', getVal: ({ email }) => email },
    { name: 'Псевдоним на форуме', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Статус', getVal: ({ role }) => role },
    { name: 'Аккаунты', getVal: ({ provider }) => provider },
];

export default userColumns;