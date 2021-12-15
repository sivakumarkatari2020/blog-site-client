import React from 'react';
import {FormControl,Grid,InputBase} from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useStyles from './styles.js';

export const EmailField = (props) => {

    const {values,setValues} = props;
    const styles = useStyles();

    const validateMail = (mail) => {
        if((/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail) && mail.length >=4) || mail.length <= 0 ){
            setValues({...values,isMailCorrect: true,email: mail.trim(),isValidated: true});
        }
        else{
            setValues({...values,isMailCorrect: false,email: mail.trim(),isValidated: true});
        }
    }

    return (
        <>
        <FormControl 
            className={
                values.isMailCorrect 
                ? styles.inputBox
                : styles.inputBoxErr
            }>
            <Grid container spacing={3} alignItems="flex-end" className={styles.inputBox2}>
                <Grid item xs={1}>
                    <PersonOutlineOutlinedIcon className={styles.icons}/>
                </Grid>
                <Grid item xs={11}>
                    <InputBase 
                        id="input-mail" 
                        placeholder="Email ID" 
                        className={styles.input}
                        onChange={(e) => validateMail(e.target.value)}
                        //Maximum length of email is changed to 50
                        inputProps={{ maxLength: 50,'aria-label': 'naked' }}
                    />
                </Grid>
            </Grid>
        </FormControl>
        {
            values.isMailCorrect
            ? ''
            : <p className={styles.helpText}>Please enter a valid email Id</p>
        }
        </>
    )
}