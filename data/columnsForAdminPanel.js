const userColumns = [
    // { name: 'Id', getVal: ({ id }) => id },
    // { name: 'Id', getVal: ({ id }) => id, setVal: val => ({ id: val }) },

    { name: 'Name', nameInBase: 'name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    { name: 'Email', nameInBase: 'email', getVal: ({ email }) => email, setVal: val => ({ email: val }) },
    { name: 'Nickname', nameInBase: 'nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },


    // { name: 'emailVerified', getVal: ({ emailVerified }) => emailVerified },
    // { name: 'emailVerified', getVal: ({ emailVerified }) => emailVerified, setVal: val => ({ emailVerified: val }) },

    { name: 'image', nameInBase: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img> },
    // { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img>, setVal: val => ({ image: val }) },

    { name: 'Role', nameInBase: 'role', getVal: ({ role }) => role, setVal: val => ({ role: val }) },
];

export default userColumns;


