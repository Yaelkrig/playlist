import './Header.css'
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';

const Header = () => {
    const userToken = localStorage.accessToken;
    const [currentUser, setCurrentUser] = useState("Guest");
    const userLoged = () => {
        if (userToken) {
            setCurrentUser(jwt_decode(userToken).username)
        }
    }
    useEffect(() => {
        userLoged();
    }, [userToken])
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