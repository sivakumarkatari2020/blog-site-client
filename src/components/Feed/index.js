import React from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router';
import {Box,Card} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import {useStyles} from './styles';
import getPostsAPI from '../../apis/getPosts';
import DeleteIcon from '@mui/icons-material/Delete';
import deletePostAPI from '../../apis/deletePostAPI';

function Feed() {
    const styles = useStyles();
    const history = useHistory();

    const [data,setData] = React.useState([]);

    const userRole = sessionStorage.getItem("userRole");

    React.useEffect(()=>{
        (async()=>{
            const apiResult = await getPostsAPI();
            setData(apiResult.data)
        })()
    },[])

    const handleDelete = async (id) => {
        try{
            const apiResult = await deletePostAPI(id);
            console.log(apiResult);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Box className={styles.outer}>
            <Box className={styles.topBottomBars}>
                <MenuAppBar></MenuAppBar>
            </Box>
            <Box className={styles.mainBody}>
                <Box className={styles.innerBody}>
                    {
                        data.map((item)=>(
                            <Card 
                                className={styles.card}
                                onClick={()=>{
                                    history.push(`/home/feed/post/${item.post_id}`);
                                }}
                                key={uuid()}
                                style={{cursor:'pointer'}}
                            >
                                <div className={styles.titleBox}>
                                    <h2>{item.post_title}</h2>
                                    <div className={styles.delBox}>
                                        {
                                            JSON.parse(userRole) === 1
                                            ? <DeleteIcon 
                                                color="primary" 
                                                className={styles.delCon}
                                                onClick={()=>{
                                                    handleDelete(item.post_id)
                                                }}
                                            />
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div className={styles.likeBox}>
                                    <p style={{margin: '0 1rem 0 0'}}>Likes : {item.post_likes}</p>
                                    <p style={{margin: '0 1rem 0 0'}}>Dislikes : {item.post_dislikes}</p>
                                </div>
                            </Card>
                        ))
                    }
                </Box>
            </Box>
            <Box className={styles.topBottomBars}>
                <MenuBottomBar></MenuBottomBar>
            </Box>
        </Box>
    )
}

export default Feed
