import React from 'react';
import { makeStyles } from '@mui/styles';
import {Box} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';

const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        position: 'relative',
    },
    topBottomBars: {
        width: '100vw',
        height: '10vh',
        maxHeight: '10vh',
    },
    mainBody: {
        margin: '1rem',
        overflow: 'auto',
        color: '#2D3F4B',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',

        '@media (max-width:1000px)': {
            width: '100%',
        },
    },
})

function Profile() {
    const styles = useStyles();

    return (
        <Box className={styles.outer}>
            <Box className={styles.topBottomBars}>
                <MenuAppBar></MenuAppBar>
            </Box>
            <Box className={styles.mainBody}>
                This is Profile page
            </Box>
            <Box className={styles.topBottomBars}>
                <MenuBottomBar></MenuBottomBar>
            </Box>
        </Box>
    )
}

export default Profile
