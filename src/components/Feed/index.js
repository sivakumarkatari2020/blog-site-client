import React from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router';
import {Box,Card} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import {useStyles} from './styles';
import getPostsAPI from '../../apis/getPosts';

function Feed() {
    const styles = useStyles();
    const history = useHistory();

    const [data,setData] = React.useState([]);

    React.useEffect(()=>{
        (async()=>{
            const apiResult = await getPostsAPI();
            setData(apiResult.data)
        })()
    },[])

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
                            >
                                <h3>{item.post_title}</h3>
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
