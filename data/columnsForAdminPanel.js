import { UserAva } from '../includes/cell-wrappers';
import { Image, Button } from '@chakra-ui/react';

const userColumns = [
    // { name: '', getVal: ({ image }) => <UserAva value={image} /> },
    { name: 'Фото', nameInBase: 'image', getVal: ({ image }) => <Image src={image} alt="avatar" borderRadius={'10px'} /> },
    { name: 'Имя', nameInBase: 'name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    { name: 'Почта', nameInBase: 'email', getVal: ({ email }) => email, setVal: val => ({ email: val }) },
    { name: 'Псевдоним на форуме', nameInBase: 'nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Статус', nameInBase: 'role', getVal: ({ role }) => role, setVal: val => ({ role: val }) },
    { name: 'Дополнительная информация', nameInBase: 'additionalInformation', getVal: ({ }) => '' },
    { name: 'Действия', nameInBase: 'actions', getVal: ({ }) => '' },
];

export default userColumns;
