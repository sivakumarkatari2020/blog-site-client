import React from 'react';
import { v4 as uuid } from 'uuid';
import { useHistory,useParams } from 'react-router';
import getPostAPI from '../../apis/getPostAPI';
import {Box} from '@mui/material';
import MenuAppBar from '../MenuAppBar';
import MenuBottomBar from '../MenuBottomBar';
import {useStyles} from '../Feed/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function Post() {
    const {post_id} = useParams();
    const history = useHistory();
    const styles = useStyles();

    const [data,setData] = React.useState([]);
    const [isLiked,setLiked] = React.useState(false);
    const [isUnLiked,setUnLiked] = React.useState(false);

    React.useEffect(()=>{
        (async()=>{
            const apiResult = await getPostAPI(post_id);
            console.log(apiResult.data);
            setData(apiResult.data)
        })()
    },[post_id])

    return (
        <Box className={styles.outer}>
            <Box className={styles.topBottomBars}>
                <MenuAppBar></MenuAppBar>
            </Box>
            <Box className={styles.mainBody}>
                <Box className={styles.innerBodyPost}>
                    {
                        data.map((item)=>(
                            <Box key={uuid()}>
                                <Box>
                                    <ArrowBackIcon 
                                        className={styles.arrowBack}
                                        onClick={()=>{
                                            history.push('/home/feed');
                                        }}
                                    />
                                </Box>
                                <h1 style={{margin: '1rem 0 2rem 0'}}>{item.post_title}</h1>
                                <p className={styles.post_para}>{item.post_body}</p>
                                <div className={styles.likeBox}>
                                    <p 
                                        style={{margin: '0 1rem 0 0',alignText: 'center'}} className={styles.reactions}
                                    >
                                        {
                                            isLiked
                                            ? <ThumbUpIcon />
                                            : <ThumbUpOffAltIcon 
                                                onClick={()=>{
                                                    setLiked(true);
                                                }}
                                            />
                                        }
                                        : {item.post_likes}
                                    </p>
                                    <p style={{margin: '0 1rem 0 0',alignText: 'center'}} className={styles.reactions}>
                                        {
                                            isUnLiked
                                            ? <ThumbDownAltIcon />
                                            : <ThumbDownOffAltIcon 
                                                onClick={()=>{
                                                    setUnLiked(true);
                                                }}
                                            />
                                        }
                                        : {item.post_dislikes}
                                    </p>
                                </div>
                            </Box>
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

export default Post