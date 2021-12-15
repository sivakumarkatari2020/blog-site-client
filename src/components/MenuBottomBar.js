import * as React from 'react';
import { useHistory } from 'react-router';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';

export default function MenuBottomBar() {
    const history = useHistory();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation sx={{ width: '100vw',height: '10%',position: 'fixed',bottom: 0,backgroundColor: '#e8eaf6' }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Home"
                value="Home"
                icon={<HomeIcon />}
                onClick={()=>{
                    history.push('/home/feed');
                }}
            />
            <BottomNavigationAction
                label="Add Blog"
                value="Add Blog"
                icon={<AddCircleIcon />}
                onClick={()=>{
                    history.push('/home/blog');
                }}
            />
            <BottomNavigationAction
                label="Profile"
                value="Profile"
                icon={<PersonIcon />}
                onClick={()=>{
                    history.push('/home/profile');
                }}
            />
        </BottomNavigation>
    )
}   
