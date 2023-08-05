import { UserAva } from '../includes/cell-wrappers';
import { Image } from '@chakra-ui/react';

const userColumns = [
    // { name: '', getVal: ({ image }) => <UserAva value={image} /> },
    { name: 'Фото', nameInBase: 'image', getVal: ({ image }) => <Image src={image} alt="avatar" borderRadius={'10px'} /> },
    { name: 'Имя', nameInBase: 'name', getVal: ({ name }) => name },
    { name: 'Почта', nameInBase: 'email', getVal: ({ email }) => email },
    { name: 'Псевдоним на форуме', nameInBase: 'nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Статус', nameInBase: 'role', getVal: ({ role }) => role },
    { name: 'Аккаунты', nameInBase: 'provider', getVal: ({ provider }) => provider },
];

export default userColumns;
