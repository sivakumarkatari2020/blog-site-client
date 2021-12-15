import React from 'react';
import { useHistory } from 'react-router';
import { useStyles } from '../Blog/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,TextField,Button} from '@mui/material';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import Loader from '../Loader';
import getUserDetailsAPI from '../../apis/getUserDetailsAPI';

toast.configure();

function Profile() {
    const styles = useStyles();
    const history = useHistory();

    const [data,setData] = React.useState({});
    const [isLoading,setLoading] = React.useState(true);

    React.useEffect(()=>{
        (async()=>{
            setLoading(true);
            const user_id = sessionStorage.getItem('userId');
            const id = JSON.parse(user_id);
            const apiResult = await getUserDetailsAPI(id);
            setData(apiResult.data[0]);
            setLoading(false);
        })()
    },[])

    return (
        <Box className={styles.outer}>
            <Box className={styles.topBottomBars}>
                <MenuAppBar></MenuAppBar>
            </Box>
            <Box className={styles.mainBody}>
                {
                    isLoading
                    ? <Loader />
                    : <form className='form_shown'>
                        <TextField 
                            id="outlined-email" 
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_mail}
                            label="User Mail ID"
                            disabled
                        />
                        <TextField 
                            id="outlined-fname" 
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_fname}
                            label="First Name"
                            disabled
                        />
                        <TextField
                            id="outlined-lname"
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_lname}
                            label="Last Name"
                            disabled
                        />
                        <TextField
                            id="outlined-gender"
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_gender}
                            label="Gender"
                            disabled
                        />
                        <TextField
                            id="outlined-mobile"
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_mobile}
                            label="Mobile"
                            disabled
                        />
                    </form>
                }
                <Fab color="primary" aria-label="edit" className={styles.floatEdit}>
                    <EditIcon />
                </Fab>
            </Box>
            <Box className={styles.topBottomBars}>
                <MenuBottomBar></MenuBottomBar>
            </Box>
        </Box>
    )
}

export default Profile