export const globalStyles = {
    'html, body': {
        height: '100%',
        // backgroundColor: '#f8e183',
        fontFamily: 'sans-serif',
    },
    '#__next': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    'main': {
        flexGrow: '1',
        marginTop: '70px',
    },
    '.main-header': {
        background: 'rgb(141, 99, 75)',
        opacity: '100%',
        position: 'fixed',
        top: '0px',
        width: '100%',
    },
    '.main-header nav': {
        flexGrow: '1',
    },
    '.navbar': {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '0px',
        paddingLeft: '10px',
        listStyleType: 'none',
    },
    '.navbar li': {
        padding: '5px',
    },
    '.link': {
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px',
    },
    '.active': {
        'backgroundColor': '#feb849',
        'borderRadius': '50px',
    },
    // '#chakra-modal-:r7e: .css-1o3pyl4': {
    //     width: '170px',
    // },
    // '#chakra-modal-:r7e:': {
    //     width: '170px',
    // },
    '.main-footer': {
        background: 'rgb(40, 28, 21)',
        color: 'white',
        opacity: '100%',
        padding: '20px',
        textAlign: 'center',
        'z-index': '3',
    },
    '.main-footer ul': {
        listStyleType: 'none',
    },
    '.footer-useful-Links': {
        color: 'white',
    },
    '.footer-useful-Links:hover': {
        color: 'yellow',
    },
    '.places': {
        backgroundColor: 'rgb(6, 13, 32)',
        color: 'white',
    },
    '.cards div': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: '1',
        marginLeft: '10px',
        marginRight: '10px',
    },
    '.share-button': {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    '.tours-page li ': {
        marginTop: '12px',

    },
    '.page': {
        marginTop: '100px',
        marginBottom: '30px',
        marginLeft: '30px',
        marginRight: '20px',
    },
};