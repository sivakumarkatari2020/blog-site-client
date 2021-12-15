import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative',
    },
    topBottomBars: {
        width: '100vw',
        height: '10vh',
        maxHeight: '10vh',
    },
    mainBody: {
        width: '90%',
        height: '80%',
        overflow: 'auto',
        color: '#2D3F4B',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
    form: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inp_title: {
        width: '100%',
        minWidth: '500px',
        height: '50px',
        fontSize: '30px',
        fontWeight: 'bold',
    },
    inp_body: {
        width: '100%',
        minWidth: '500px',
        height: '500px',
        fontSize: '18px',
    },
    form_shown:{
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    inp: {
        width: '80%',
        margin: '1rem',
    },
    floatEdit: {
        position: 'absolute',
        top: '80%',
        left: '85%',
    },
})
