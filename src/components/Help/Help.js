import './Help.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import { useEffect } from 'react';

const Help = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='help_conteiner'>
            <h2 className='help_header'>Help</h2>
            <p className='first_p'>In this site you will able to listen music, create your own playlists or listen to other's.</p>
            <p className='help_axplain'>At <HomeIcon className='help_icon' fontSize="large" /> you will find all playlists.</p>
            <p className='help_axplain'>Registered user can create and edit there's playlists.</p>
            <p className='help_axplain'>At  <AccountCircleIcon className='help_icon' fontSize="large" /> you can sign up.
                <LoginIcon className='help_icon' fontSize="large" /> for sign in,
                or <LogoutIcon className='help_icon' fontSize="large" /> for out. </p>
            <p className='help_axplain'>At <InfoOutlinedIcon className='help_icon' fontSize="large" />
                there is a bit of information about me, and contact information as well. </p>
            <p className='help_axplain'> Feel free to contact me for any reason <MoodOutlinedIcon className='help_icon' fontSize="large" /></p>
        </div>
    )
}
export default Help;