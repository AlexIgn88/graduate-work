const userColumns = [
    { name: 'Id', getVal: ({ id }) => id },
    // { name: 'Id', getVal: ({ id }) => id, setVal: val => ({ id: val }) },

    { name: 'Name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    { name: 'Email', getVal: ({ email }) => email, setVal: val => ({ email: val }) },


    { name: 'emailVerified', getVal: ({ emailVerified }) => emailVerified },
    // { name: 'emailVerified', getVal: ({ emailVerified }) => emailVerified, setVal: val => ({ emailVerified: val }) },

    { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img> },
    // { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img>, setVal: val => ({ image: val }) },

    { name: 'Role', getVal: ({ role }) => role, setVal: val => ({ role: val }) },
];

export default userColumns;


