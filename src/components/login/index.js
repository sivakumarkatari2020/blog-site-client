import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box,Button,Link, Typography} from '@mui/material';
import useStyles from './styles.js';
import { EmailField } from './EmailField.js';
import { PasswordField } from './PasswordField.js';
import verifyAPI from '../../apis/verifyAPI';
import Loader from '../Loader.js';
//import loginAPI from '../../apis/admin/loginAPI.js';

toast.configure();

function Login(props) {
    
    //const {setToken} = props;
    
    const [values , setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
        rememberMe: false,
        isMailCorrect: true,
        isPasswordCorrect: true,
        isValidated: true,
        isValuesPresent: false,
        isLoading: false,
        errMessage: '',
    });
    
    const styles = useStyles();
    const history = useHistory();
    
    const handleSubmit = async e => {
        e.preventDefault();
        setValues({...values,isLoading : true});
        const credentials = {email: values.email,password: values.password}
        const apiResult = await verifyAPI(credentials);
        if(apiResult.status === 200){
            sessionStorage.setItem('userId',apiResult.data[0].user_id);
            sessionStorage.setItem('userRole',apiResult.data[0].user_role);
            setValues({...values,isValidated : true,isLoading: false});
            //const token = await loginAPI(values);
            //setToken(token);        
            history.push('/home/feed');
            toast.success(apiResult.message,{
                autoClose: '1000',
            });
        }else if(apiResult.status === 422){
            setValues({...values,isValidated : false,isLoading: false,errMessage : apiResult.message});
            toast.error(apiResult.message,{
                autoClose: '2000',
                position: 'bottom-center'
            });
        }else if(apiResult.status === 503){
            setValues({...values,isValidated : false,isLoading: false,errMessage : apiResult.message});
            toast.error(apiResult.message,{
                autoClose: '2000',
                position: 'bottom-center'
            });
        }else{
            setValues({...values,isValidated : false,isLoading: false,errMessage : apiResult.message});
            toast.error("Try Again!we are experiencing problem.",{
                autoClose: '2000',
                position: 'bottom-center'
            });
        }
    }
    
    //React.useEffect(() => {
    //    const credentials = localStorage.getItem('credentials');
    //
    //    if(credentials !== undefined){
    //        setValues({...values,isValuesPresent: true});
    //    }
    //},[values])

    //const downloadDoc = async() => {
    //    const apiResponse = await getDocfileAPI();
    //    console.log(apiResponse);
    //}

    return (
        <Box className={styles.outer}>
            {
                //<a href='http://localhost:8080/api/getDocfile/LNPROP458' target='_blank' rel="noreferrer">Download file</a>
            }
            <form className={styles.inner}>
                <Box className={styles.innerinner}>
                    <Typography className={styles.text} variant={'h3'}>Welcome</Typography>
                    {
                        //values.isValidated
                        //? ''
                        //: <Typography variant={'subtitle2'} className={styles.errText}>{values.errMessage}</Typography>
                    }
                    <Box className={styles.form}>
                        <EmailField values={values} setValues={setValues} tabIndex={1}/>
                        <PasswordField values={values} setValues={setValues} tabIndex={2}/>
                        {
                            values.email.length > 1 && values.password.length > 1 && values.isMailCorrect && values.isPasswordCorrect
                            ? values.isLoading
                                ? <Loader />
                                : <Button 
                                    variant="contained" 
                                    className={styles.Button}
                                    onClick={handleSubmit}>Login</Button>
                            : <Button 
                                variant="contained" 
                                className={styles.ButtonDis}
                                tabIndex={4}
                                onClick={()=>{
                                    if(values.email.length < 1 && values.password.length < 1){
                                        toast.info('Please Enter valid Username and Password',{
                                            autoClose: 1000,
                                            position: 'bottom-center'
                                        })
                                    }
                                    else if(values.email.length < 1 || !values.isMailCorrect){
                                        toast.info('Please Enter valid Username',{
                                            autoClose: 1000,
                                            position: 'bottom-center'
                                        })
                                    }
                                    else if(values.password.length < 1 || !values.isPasswordCorrect){
                                        toast.info('Please Enter valid Password',{
                                            autoClose: 1000,
                                            position: 'bottom-center'
                                        })
                                    }else{
                                        toast.info('Please Enter Credentials!',{
                                            autoClose: 1000,
                                            position: 'bottom-center'
                                        })
                                    }
                                }}
                                >Login</Button>
                        }
                        <Typography className={styles.formLinks}>
                            <Link href="/signup" tabIndex={5}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

//Login.propTypes = {
//    setToken: PropTypes.func.isRequired
//}

export default Login
