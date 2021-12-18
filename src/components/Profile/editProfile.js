import React from 'react';
import { useHistory } from 'react-router';
import { useStyles } from '../Blog/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,TextField,ButtonGroup,Button,FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import Loader from '../Loader';
import getUserDetailsAPI from '../../apis/getUserDetailsAPI';
import editUserDetailsAPI from '../../apis/editUserDetailsAPI';

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

    const handleUpdate = async () => {
        try{
            const userID = sessionStorage.getItem("userId");
            let apiResult = await editUserDetailsAPI(JSON.parse(userID),data);
            if(apiResult.data.status === 200){
                toast.success(apiResult.data.message,{
                    autoClose: 1000,
                })
                history.push('/home/profile');
            }else if(apiResult.data.status === 403){
                toast.error(apiResult.data.message,{
                    autoClose: 1000,
                })
                history.push('/home/profile');
            }else{
                toast.error('Error!Try again later.',{
                    autoClose: 1000,
                })
                history.push('/home/profile');
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                                label="Gender"
                                onChange={(e)=>{
                                    setData({...data,user_gender:e.target.value})
                                }}
                                className={styles.inpSelect}
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
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={handleUpdate}
                                variant="contained"
                            >UPDATE</Button>
                            <Button onClick={()=>{
                                history.push('/home/profile');
                                }}
                                variant="contained"
                                color="secondary"
                            >CANCEL</Button>
                        </ButtonGroup>
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