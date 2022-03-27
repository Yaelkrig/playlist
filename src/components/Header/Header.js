import './Header.css'
import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from 'react';
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';

const Header = () => {
    const { userAccessToken } = useContext(UserAceessTokenContext)
    const [currentUser, setCurrentUser] = useState("Guest");
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
            {currentUser && <span className='name'>Hello {currentUser}</span>}
        </div>
    )
}
export default Header;