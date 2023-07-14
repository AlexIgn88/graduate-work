const userColumns = [
    { name: 'Id', getVal: ({ id }) => id },
    { name: 'Name', getVal: ({ name }) => name, setVal: val => ({ name: val }) },
    // { name: 'Last Name', getVal: ({ lastName }) => lastName, setVal: val => ({ lastName: val }) },
    { name: 'Email', getVal: ({ email }) => email, setVal: val => ({ email: val }) },

    { name: 'emailVerified', getVal: ({ emailVerified }) => emailVerified },
    { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img> },

    // { name: 'Image', getVal: ({ image }) => image, setVal: val => ({ image: val }) },
    // { name: 'Birthday', getVal: ({ birthday }) => birthday, setVal: val => ({ birthday: val }) },

    { name: 'Role', getVal: ({ role }) => role, setVal: val => ({ role: val }) },
];

export default userColumns;


