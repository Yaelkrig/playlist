import './Song.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import songIndexContext from '../../Contexts/songIndexContext';
import api from '../../apis/axios_api';
import removeContext from '../../Contexts/removeContext';

const Song = ({ song, playlistId, isMy }) => {
    const { setPlaylists } = useContext(removeContext);
    const { setSongPlayer } = useContext(songIndexContext);

    const song_img = song.imgUrl;
    const removeSong = (playlist, song) => {
        const data = JSON.stringify({
            playlistId: playlist,
            songId: song
        });
        try {
            api.put('/playlists/deleteSong', data)
                .then(res => {
                    setPlaylists(res.data);
                });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div key={song._id} className='song'
            onClick={() => {
                setSongPlayer(song.url);
                window.scrollTo(0, 0);
            }}>
            <div className='play'>
                <img className='song_img' src={song_img} alt='song_img' />
                <p className='song_title'>{song.title}</p>
            </div>
            {isMy && <DeleteIcon className='delete_song'
                onClick={() => removeSong} />}
        </div>
    )
}
export default Song;