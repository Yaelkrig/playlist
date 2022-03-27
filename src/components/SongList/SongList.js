import './SongList.css'
import Song from "../Song/Song";
import { useContext, useState } from "react";
import PlaylistsContext from '../../Contexts/PlaylistsContext';
import { useParams } from 'react-router';

const SongList = ({ playlist }) => {
    const { id } = useParams();
    const userId = "61fff6f14a1708167f168693";
    const [isMy, setIsMy] = useState(playlist.createdBy === userId);

    console.log(playlist);
    return (
        <div className='SongList'>
            <h2 className='play_title'>{playlist.title}</h2>
            {playlist.songs.length > 0 ?
                playlist.songs.map(song => {
                    return (
                        <Song key={song._id} song={song} playlistId={id} isMy={isMy} />)
                }
                ) :
                <div>No Songs Yet{isMy && <span>, Add </span>}</div>
            }
        </div>

    )
}
export default SongList;