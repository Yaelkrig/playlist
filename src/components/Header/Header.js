import './Header.css'

const Header = ({ currentUser }) => {

    console.log(currentUser)
    return (
        <div className='Header'>
            <div className='logo'></div>
            <h1>
                Playlist
            </h1>
            {currentUser && <span className='name'>Hello {currentUser},</span>}
        </div>
    )
}
export default Header;