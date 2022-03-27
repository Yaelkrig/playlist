import './SongList.css'
import Song from "../Song/Song";
import jwt_decode from "jwt-decode";
import { useContext, useState } from "react";
import PlaylistsContext from '../../Contexts/PlaylistsContext';
import { useParams } from 'react-router';
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';
import playPlaylistIndexContext from '../../Contexts/playPlaylistIndexContext';

const SongList = () => {
    const { id } = useParams();
    const { userAccessToken } = useContext(UserAceessTokenContext)
    const { playPlaylist } = useContext(playPlaylistIndexContext);
    const userId = userAccessToken ? jwt_decode(userAccessToken)._id : null;
    console.log(userId);
    console.log(playPlaylist.createdBy);
    const [isMy, setIsMy] = useState(playPlaylist.createdBy === userId);
    console.log(playPlaylist);
    return (
        <div className='SongList'>
            <h2 className='play_title'>{playPlaylist.title}</h2>
            {playPlaylist.songs.length > 0 ?
                playPlaylist.songs.map(song => {
                    return (
                        <Song key={song._id} song={song} playlistId={id} isMy={isMy} />)
                }
                ) :
                <div>No Songs Yet{isMy ? <span>, Add your favorites songs! </span> : <span>, search for another playlists</span>}</div>
            }
        </div>

    )
}
export default SongList;