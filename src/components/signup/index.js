import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import PropTypes from 'prop-types';
import { Box,Button,Link, Typography} from '@mui/material';
import useStyles from './styles.js';
import { EmailField } from './EmailField.js';
import { PasswordField } from './PasswordField';
import { ConfirmPasswordField } from './ConfirmPasswordField.js';
import Loader from '../Loader';
import signUpAPI from '../../apis/signUpAPI.js';

toast.configure();


function Signup() {
    const styles = useStyles();
    const history = useHistory();

    const [values , setValues] = React.useState({
        mail: '',
        password: '',
        showPassword: false,
        showCPassword: false,
        cpassword: '',
        fname: '',
        lname: '',
        gender: '',
        mobile: '',
        isMailCorrect: true,
        isPasswordCorrect: true,
        isCPasswordCorrect: true,
        isValidated: true,
        isValuesPresent: false,
        isLoading: false,
        errMessage: '',
    });

    const handleSubmit = async e => {
        e.preventDefault();
        setValues({...values,isLoading : true});
        const apiResponse = await signUpAPI(values);
        if(apiResponse.data.status === 200){
            toast.success(apiResponse.data.message,{
                autoClose: '1000',
            });
            setValues({
                mail: '',
                password: '',
                showPassword: false,
                showCPassword: false,
                cpassword: '',
                fname: '',
                lname: '',
                gender: '',
                mobile: '',
                isMailCorrect: true,
                isPasswordCorrect: true,
                isCPasswordCorrect: true,
                isValidated: true,
                isValuesPresent: false,
                isLoading: false,
                errMessage: '',    
            });
            history.push('/login');
        }else if(apiResponse.data.status === 422){
            toast.error(apiResponse.data.message,{
                autoClose: '1000',
            });
            setValues({...values,isLoading : false});
        }else{
            toast.error("Network Error! Try again",{
                autoClose: '1000',
            });
            setValues({...values,isLoading : false});
        }
    }

    return (
        <Box className={styles.outer}>
        <form className={styles.inner}>
            <Box className={styles.innerinner}>
                <Typography className={styles.text} variant={'h3'}>Sign Up</Typography>
                <Box className={styles.form}>
                    <EmailField values={values} setValues={setValues} tabIndex={1}/>
                    <PasswordField values={values} setValues={setValues} tabIndex={2}/>
                    <ConfirmPasswordField values={values} setValues={setValues} tabIndex={3}/>
                    {
                        values.mail.length > 1 && values.password.length > 1 && values.isMailCorrect && values.isPasswordCorrect && values.isCPasswordCorrect
                        ? values.isLoading
                            ? <Loader />
                            : <Button 
                                variant="contained" 
                                className={styles.Button}
                                onClick={handleSubmit}>Sign Up</Button>
                        : <Button 
                            variant="contained" 
                            className={styles.ButtonDis}
                            tabIndex={4}
                            onClick={()=>{
                                if(values.mail.length < 1 && values.password.length < 1){
                                    toast.info('Please Enter valid Username and Password',{
                                        autoClose: 1000,
                                        position: 'bottom-center'
                                    })
                                }
                                else if(values.mail.length < 1 || !values.isMailCorrect){
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

                                if(values.password !== values.cpassword){
                                    toast.info('Passwords not matched!',{
                                        autoClose: 1000,
                                        position: 'bottom-center'
                                    })
                                }
                            }}
                            >Sign Up</Button>
                    }
                    <Typography className={styles.formLinks}>
                        <Link href="/login" tabIndex={5}>
                            Login here.
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </form>
        </Box>
    )
}

export default Signup
