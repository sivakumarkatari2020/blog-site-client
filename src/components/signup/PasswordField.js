import React from 'react';
import {FormControl,Grid,InputBase,InputAdornment,IconButton} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useStyles from './styles.js';


export const PasswordField = (props) => {

    const {values,setValues} = props;
    const styles = useStyles();

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePassword = (key) => {
        if((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(key)&&key.length>4) || key.length <= 0){
            setValues({...values,isPasswordCorrect: true,password: key.trim(),isValidated: true});
        }
        else{
            setValues({...values,isPasswordCorrect: false,password: key.trim(),isValidated: true});
        }
    }

    return (
        <>
            <FormControl 
                className={
                    values.isPasswordCorrect 
                    ? styles.inputBox
                    : styles.inputBoxErr
                }
            >
                <Grid container spacing={3} alignItems="flex-end" className={styles.inputBox2}>
                    <Grid item xs={1}>
                        <LockOutlinedIcon className={styles.icons}/>
                    </Grid>
                    <Grid item xs={11}>
                        <InputBase
                            id="input-password"
                            className={styles.input}
                            placeholder="Password"
                            inputProps={{ maxLength: 20,'aria-label': 'naked' }}
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            error={values.isPasswordCorrect}
                            onChange={
                                (e)=>{
                                    validatePassword(e.target.value);
                                }
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                    {
                                    values.showPassword ? 
                                        <VisibilityIcon className={styles.icons}/> : 
                                        <VisibilityOffIcon className={styles.icons}/>
                                    }
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
            </FormControl>
            {
                    values.isPasswordCorrect
                    ? ''
                    : <p className={styles.helpText}>
                        Password doesn't match the rquirements.
                    </p>
            }
        </>
    )
}