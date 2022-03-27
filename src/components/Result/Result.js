
import './Result.css'
import AddIcon from '@mui/icons-material/Add';
import playlistIndexContext from '../../Contexts/playPlaylistIndexContext';
import { useContext } from 'react';
import songIndexContext from '../../Contexts/songIndexContext';
import PlaylistsContext from '../../Contexts/PlaylistsContext';
import api from '../../apis/axios_api';
import { useNavigate } from 'react-router';
import IsHomePageContext from '../../Contexts/IsHomePageContext';
import playPlaylistIndexContext from '../../Contexts/playPlaylistIndexContext';

const Result = ({ details, setResults }) => {
    const navigate = useNavigate();
    const { setSongPlayer } = useContext(songIndexContext);
    const { setIsHomePage } = useContext(IsHomePageContext);
    const { setPlayPlaylist } = useContext(playPlaylistIndexContext)
    const { playlistIndex } = useContext(playlistIndexContext);
    const { playlists, setPlaylists } = useContext(PlaylistsContext);
    const title = details.snippet ? details.snippet.title : details.title;
    const songUrl = details.snippet ? details.id.videoId : details._id;
    const imgUrl = details.snippet ? details.snippet.thumbnails.default.url : details.songs[0].imgUrl
    let songToAdd = {};

    const addSong = (details, index) => {
        if (playlists[index]) {
            const data = JSON.stringify({
                ...details,
                playlist: playlists[index]._id
            })
            try {
                api.post('/songs/add', data)
                    .then(res => {
                        console.log(res);
                        setPlayPlaylist(prePlaylist => res.data._id === prePlaylist._id)
                        setPlaylists(res.data);
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            return true;
        }
    }
    return (
        <div className='Result' >
            <span className='play_song'
                onClick={() => {
                    if (details.snippet) {
                        setSongPlayer(songUrl);
                    } else {
                        setIsHomePage(false)
                        navigate(`/playlist/${details._id}`);
                    }
                    setResults("");
                }} >
                <img className='song_img' alt={title} src={imgUrl} />
                <span className="description">{title}</span>
            </span>
            {details.snippet && <AddIcon className='icon addToPlaylist'
                onClick={() => {
                    songToAdd = {
                        id: details.id.videoId,
                        title: details.snippet.title,
                        artist: details.snippet.channelTitle,
                        url: details.id.videoId,
                        imgUrl: details.snippet.thumbnails.default.url,
                    }
                    setResults("")
                    addSong(songToAdd, playlistIndex);
                }}
            />}
        </div >
    )
}

export default Result;