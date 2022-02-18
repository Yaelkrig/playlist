import './Header.css'
import currentUserContext from '../../Contexts/currentUserContext';
import { useContext } from 'react';
const Header = () => {
    //const { currentUser } = useContext(currentUserContext);
    //console.log(currentUser)
    return (
        <div className='Header'>
            <div className='logo'></div>
            <h1>
                Playlist
            </h1>
            {/* {currentUser && <span className='name'>Hello {currentUser},</span>} */}
        </div>
    )
}
export default Header;