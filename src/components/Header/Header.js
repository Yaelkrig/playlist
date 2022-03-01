import { useEffect, useState } from 'react';
import './Header.css'

const Header = () => {
    const userToken = localStorage.accessToken;
    const [currentUser, setCurrentUser] = useState("Guest");
    const userLoged = () => {
        if (userToken) {
            setCurrentUser(JSON.parse(atob(userToken.split(".")[1])).username)
        }
    }
    useEffect(() => {
        userLoged();
    }, [userToken])
    return (
        <div className='Header'>
            {/* <div className='logo'></div> */}
            <h1>
                Playlist
            </h1>
            {currentUser && <span className='name'>Hello {currentUser}</span>}
        </div>
    )
}
export default Header;