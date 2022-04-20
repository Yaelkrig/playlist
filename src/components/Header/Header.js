import './Header.css'
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from 'react';
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';
import { Avatar } from '@mui/material';
import { useNavigate } from "react-router";

const Header = () => {
    const { userAccessToken } = useContext(UserAceessTokenContext);
    const [currentUser, setCurrentUser] = useState("Guest");
    const navigate = useNavigate()
    console.log(userAccessToken);
    const userLoged = () => {
        if (userAccessToken) {
            setCurrentUser(jwt_decode(userAccessToken).username)
        }
    }
    useEffect(() => {
        userLoged();
    }, [userAccessToken])
    console.log('header');
    return (
        <div className='Header'>
            <img className='logo' src='../images/sound-waves.png' alt='logo' />
            <h1>
                Playlist
            </h1>
            {currentUser &&
                <Avatar className='profile_icon'
                    onClick={() => navigate('/profile')}>{userAccessToken ? currentUser[0] : '-'}</Avatar>}
        </div>
    )
}
export default Header;