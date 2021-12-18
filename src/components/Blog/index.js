import React from 'react';
import { useHistory } from 'react-router';
import { useStyles } from './styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Box,TextField,Button} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import saveBlogAPI from '../../apis/saveBlogAPI';
import Loader from '../Loader';

toast.configure();

function Blog() {
    const styles = useStyles();
    const history = useHistory();

    const [isEntered,setEntered] = React.useState(false);
    const [isLoading,setLoading] = React.useState(false);

    const [values,setValues] = React.useState({
        title: '',
        body: '',
        owner: '',
        likes: 0,
        dislikes: 0,
    })

    React.useEffect(()=>{
        try{
            const userId = sessionStorage.getItem('userId');
            console.log(JSON.parse(userId));
            setValues({...values,owner:JSON.parse(userId)});
        } catch (err) {
            setValues({...values,owner: 1});
            console.log(err);
        }    
    },[])

    React.useEffect(()=>{
        if(values.title.length > 3 && values.body.length > 10){
            setEntered(true);
        }else{
            setEntered(false);
        }
    },[values.body.length, values.title.length])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const apiResult = await saveBlogAPI(values);
        if(apiResult.data.status === 200){
            setLoading(false);
            setValues({
                title: '',
                body: '',
                owner: '',
                likes: 0,
                dislikes: 0,        
            });
            history.push('/home/feed');
            toast.success(apiResult.data.message,{
                autoClose: '1000',
            });
        }else if(apiResult.data.status === 422){
            setLoading(false);
            toast.error(apiResult.data.message,{
                autoClose: '1000',
                position: 'bottom-center'
            });
        }else{
            setLoading(false);
            toast.error("Try Again!we are experiencing problem.",{
                autoClose: '1000',
                position: 'bottom-center'
            });
        }
    }

    return (
        <Box className={styles.outer}>
            <Box className={styles.topBottomBars}>
                <MenuAppBar></MenuAppBar>
            </Box>
            <Box className={styles.mainBody}>
                {
                    isLoading
                    ? <Loader />
                    : <form className='form'>
                        <TextField 
                            id="outlined-basic" 
                            placeholder="Enter title here..."
                            variant="standard" 
                            className={styles.inp_title}
                            onChange={(e)=>{
                                setValues({...values,title:e.target.value})
                            }}
                            inputProps={{ maxLength: 50,'aria-label': 'naked'}}
                        />
                        <TextField
                            id="filled-multiline-static"
                            multiline
                            rows={20}
                            placeholder="Start writing your blog here..."
                            variant="outlined" 
                            className={styles.inp_body}
                            onChange={(e)=>{
                                setValues({...values,body:e.target.value})
                            }}
                        />
                        {
                            isEntered
                            ? <Button 
                                variant="contained"
                                onClick={handleSubmit}>
                                Post
                            </Button>
                            : <Button 
                                variant="contained"
                                color="secondary"
                                onClick={()=>{
                                    if(values.title.length === 0 || values.body.length === 0){
                                        toast.info("Please enter title & body",{
                                            autoClose:2000,
                                        })
                                    }
                                    else if(values.title.length <= 3 || values.body.length <= 10){
                                        toast.info("Title or Body is not in sufficient length to post!",{
                                            autoClose:2000,
                                        })
                                    }
                                }}
                                >Post</Button>
                        }
                    </form>
                }
            </Box>
            <Box className={styles.topBottomBars}>
                <MenuBottomBar></MenuBottomBar>
            </Box>
        </Box>
    )
}

export default Blog
