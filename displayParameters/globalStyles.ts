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
    '.active': {
        'backgroundColor': '#feb849',
        'borderRadius': '50px',
    },
    '.main-footer': {
        background: 'rgb(40, 28, 21)',
        opacity: '100%',
        padding: '20px',
        textAlign: 'center',
        'z-index': '3',
    },
    '.main-footer p': {
        fontSize: '14px',
        color: 'white',
    },
    '.places': {
        backgroundColor: 'rgb(6, 13, 32)',
        color: 'white',
    },
    '.places .active': {
        'backgroundColor': 'black',
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
};