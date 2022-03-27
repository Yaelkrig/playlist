import './PublicPlaylist.css'
import { useContext } from 'react';
import PlaylistsContext from '../../Contexts/PlaylistsContext';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';
import IsHomePageContext from '../../Contexts/IsHomePageContext';
import playPlaylistIndexContext from '../../Contexts/playPlaylistIndexContext';

const PublicPlaylist = () => {
    const navigate = useNavigate();
    const { userAccessToken } = useContext(UserAceessTokenContext);
    const { setPlayPlaylist } = useContext(playPlaylistIndexContext);
    const { setIsHomePage } = useContext(IsHomePageContext);
    const { playlists } = useContext(PlaylistsContext);
    const userId = userAccessToken ? jwt_decode(userAccessToken)._id : null;
    const publicPlaylists = userAccessToken ? playlists.filter(playlist => playlist.createdBy !== userId) : playlists;
    return (
        <>
            <h2 className='playlists_header'>Public Playlists</h2>
            <div className="playlists_container" >
                {publicPlaylists &&
                    publicPlaylists.map(playlist => {
                        const playlist_img = playlist.songs.length ? playlist.songs[0].imgUrl : "../images/sound-waves.png";
                        const id = playlist._id;
                        return (
                            <div key={playlist._id} className='playlist'
                                onClick={() => {
                                    setIsHomePage(false);
                                    setPlayPlaylist(playlists.filter(playlist => playlist._id === id)[0])
                                    navigate(`/playlist/${playlist._id}`)
                                }}>
                                <img className='palaylist_img' src={playlist_img} alt='palaylist_img' />
                                <p className='playlist_title'>{playlist.title}</p>
                            </div>)
                    }
                    )
                }
            </div >
        </>
    )
}
export default PublicPlaylist;