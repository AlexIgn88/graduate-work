import { UserAva } from '../includes/cell-wrappers';


const userColumns = [
    { name: 'Фото', nameInBase: 'image', getVal: ({ name, image }) => <UserAva name={name} value={image} /> },
    { name: 'Имя', nameInBase: 'name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    { name: 'Почта', nameInBase: 'email', getVal: ({ email }) => email, setVal: val => ({ email: val }) },
    { name: 'Псевдоним на форуме', nameInBase: 'nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Статус', nameInBase: 'role', getVal: ({ role }) => role, setVal: val => ({ role: val }) },
    { name: 'Дополнительная информация', nameInBase: 'additionalInformation', getVal: ({ }) => '' },
    { name: 'Действия', nameInBase: 'actions', getVal: ({ }) => '' },
];

export default userColumns;
