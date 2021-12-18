import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    topBottomBars: {
        width: '100vw',
        height: '10vh',
        overflow: 'hidden',
        maxHeight: '10vh',
    },
    mainBody: {
        width: '90%',
        height: '80vh',
        overflow: 'scroll',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
    innerBody: {
        width: '90%',
        height: '100%',
        color: '#2D3F4B',

        display: 'grid',
        gridTemplateColumns: '100%',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
    innerBodyPost: {
        width: '100%',
        height: '100%',
        color: '#2D3F4B',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
    card: {
        width: '90%',
        height: '100px',
        padding: '1rem',
        margin: '.5rem 0',
        borderRadius: '10px',
        backgroundColor: '#e8eaf6',
        boxShadow: 'none',

        display: 'flex',

        flexDirection: 'column',

        justifyContent: 'space-around',

        alignItems: 'flex-start',

        cursor: 'pointer',
    },
    titleBox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    delBox: {
        width: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    delCon: {
        '&:hover':{
            color: 'red',
        }
    },
    likeBox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    reactions: {
        width: '100px',
        heigth: '70px',
        padding: '0.5rem',
        borderRadius: '35px',
        background: '#3f51b5',
        color: 'white',
        textAlign: 'center',
    },
    arrowBack: {
        width: '70px',
        height: '50px',
        margin: '2rem 0',
    },
    post_para: {
        height: '60%',
    },
    form_shown: {

    },
})
