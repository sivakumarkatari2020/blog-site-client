import React from 'react';
import { useHistory } from 'react-router';
import { useStyles } from '../Blog/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,TextField,Button,FormControl,InputLabel,Select,MenuItem} from '@mui/material';
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
            <Box className={styles.mainBody_formshown}>
                {
                    isLoading
                    ? <Loader />
                    : <form className='form_shown'>
                        <TextField 
                            id="outlined-email" 
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_mail}
                            onChange={(e)=>{
                                setData({...data,user_mail:e.target.value});
                            }}
                            label="User Mail ID"
                        />
                        <br />
                        <br />
                        <TextField 
                            id="outlined-fname" 
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_fname}
                            onChange={(e)=>{
                                setData({...data,user_fname:e.target.value});
                            }}
                            label="First Name"
                        />
                        <br />
                        <br />
                        <TextField
                            id="outlined-lname"
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_lname}
                            onChange={(e)=>{
                                setData({...data,user_lname:e.target.value});
                            }}
                            label="Last Name"
                        />
                        <br />
                        <br />
                        <FormControl>
                            <InputLabel id="Outlined-gender">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.user_gender}
                                label="Age"
                                onChange={(e)=>{
                                    setData({...data,user_gender:e.target.value})
                                }}
                                classname={styles.inp}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <br />
                        <TextField
                            id="outlined-mobile"
                            variant="outlined" 
                            className={styles.inp}
                            value={data?.user_mobile}
                            onChange={(e)=>{
                                setData({...data,user_mobile:e.target.value});
                            }}
                            label="Mobile"
                        />
                        <br />
                        <br />
                        <Button onClick={()=>{
                            history.push('/home/profile');
                        }}
                        variant="contained"
                        >SAVE</Button>
                    </form>
                }
            </Box>
            <Box className={styles.topBottomBars}>
                <MenuBottomBar></MenuBottomBar>
            </Box>
        </Box>
    )
}

export default Profile