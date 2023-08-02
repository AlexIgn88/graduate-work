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
    '.header': {
        background: 'rgb(141, 99, 75)',
        opacity: '100%',
        position: 'fixed',
        top: '0px',
        width: '100%',
    },
    '.header nav': {
        flexGrow: '1',
    },
    '.active': {
        'backgroundColor': 'rgb(40, 28, 21)',
        'borderRadius': '50px',
    },
    '.footer': {
        background: 'rgb(40, 28, 21)',
        opacity: '100%',
        padding: '20px',
        textAlign: 'center',
        'z-index': '3',
    },
    '.footer p': {
        fontSize: '14px',
        color: 'white',
    }
};