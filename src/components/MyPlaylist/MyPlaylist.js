import './MyPlaylist.css';
import { useContext, useState } from 'react';
import PlaylistsContext from '../../Contexts/PlaylistsContext';
import { useNavigate } from 'react-router';
import jwt_decode from "jwt-decode";
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';
import IsHomePageContext from '../../Contexts/IsHomePageContext';
import playPlaylistIndexContext from '../../Contexts/playPlaylistIndexContext';
import Spinner from '../../Spinner/Spinner';
import DisplayPlaylistHome from '../DisplayPlaylistHome/DisplayPlaylistHome';
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import AddPlaylist from '../AddPlaylist/AddPlaylist';

const MyPlaylist = () => {
    const navigate = useNavigate();
    const { userAccessToken } = useContext(UserAceessTokenContext);
    const { playlists } = useContext(PlaylistsContext);
    const userId = userAccessToken ? jwt_decode(userAccessToken)._id : null;
    const [addPlay, setAddPlay] = useState(false);
    const MyPlaylists = userAccessToken ? playlists.filter(playlist => playlist.createdBy === userId) : null;
    return (
        <>
            <div className='mine_con'>
                <h2 className='playlists_header'>My Playlists</h2>
                {
                    userId ?
                        <>
                            <AddCircleOutlineTwoToneIcon className='add_playlist_icon'
                                onClick={() => setAddPlay(true)} />
                            {addPlay && <AddPlaylist setAddPlay={setAddPlay} />}
                        </> :
                        <>
                            <br />
                            <p className='not_connected_user'>*** Enter Your Account Or Create One To Create And Edit Your Own Playlists! ***</p>
                        </>
                }
            </div>
            <div className="playlists_container" >
                {userId && MyPlaylists &&
                    MyPlaylists.map(playlist => {
                        const playlist_img = playlist.songs.length ? playlist.songs[0].imgUrl : "../images/sound-waves.png";
                        const id = playlist._id
                        return (
                            <DisplayPlaylistHome playlist={playlist} playlist_img={playlist_img} id={id} />
                        )
                    }
                    )
                }
            </div >
        </>
    )
}
export default MyPlaylist;