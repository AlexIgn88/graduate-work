import { UserAva } from '../includes/cell-wrappers';


const userColumns = [
    { name: 'Фото', nameInBase: 'image', getVal: ({ name, image }) => <UserAva name={name} value={image} /> },
    { name: 'Имя', nameInBase: 'name', getVal: ({ name }) => name },
    { name: 'Почта', nameInBase: 'email', getVal: ({ email }) => email },
    { name: 'Псевдоним на форуме', nameInBase: 'nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Статус', nameInBase: 'role', getVal: ({ role }) => role },
    { name: 'Аккаунты', nameInBase: 'provider', getVal: ({ provider }) => provider },
];

export default userColumns;
