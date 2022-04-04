import './DisplayPlaylistHome.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import IsHomePageContext from '../../Contexts/IsHomePageContext';
import playPlaylistIndexContext from '../../Contexts/playPlaylistIndexContext';
import PlaylistsContext from '../../Contexts/PlaylistsContext';

const DisplayPlaylistHome = ({ playlist, playlist_img, id }) => {
    const navigate = useNavigate();
    const { playlists } = useContext(PlaylistsContext);
    const { setPlayPlaylist } = useContext(playPlaylistIndexContext);
    const { setIsHomePage } = useContext(IsHomePageContext);
    return (
        <div key={playlist._id} className='playlist'
            onClick={() => {
                setIsHomePage(false);
                setPlayPlaylist(playlists.filter(playlist => playlist._id === id)[0])
                navigate(`/playlist/${playlist._id}`)
            }}>
            <img className='palaylist_img' src={playlist_img} alt='playlist_img' />
            <p className='playlist_title'>{playlist.title}</p>
        </div>
    )
}
export default DisplayPlaylistHome;