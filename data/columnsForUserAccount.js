const userColumns = [
    // { name: 'Id', getVal: ({ id }) => id },
    // { name: 'Id', getVal: ({ id }) => id, setVal: val => ({ id: val }) },
    { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img> },
    // { name: 'image', getVal: ({ image }) => <img src={image} alt="avatar"></img>, setVal: val => ({ image: val }) },
    { name: 'Name', getVal: ({ name }) => name },
    { name: 'Email', getVal: ({ email }) => email },
    { name: 'Nickname', getVal: ({ nickname }) => nickname, setVal: val => ({ nickname: val }) },
    { name: 'Role', getVal: ({ role }) => role },
    { name: 'Providers', getVal: ({ provider }) => provider },
];

export default userColumns;
