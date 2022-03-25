import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import './Song.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import songIndexContext from '../../Contexts/songIndexContext';
import api from '../../apis/axios_api';
import removeContext from '../../Contexts/removeContext';
import playlistIndexContext from '../../Contexts/playlistIndexContext';
import PlaylistsContext from '../../Contexts/PlaylistsContext';

const Song = ({ song, playlistId }) => {
    const { playlists } = useContext(PlaylistsContext)
    const { setPlaylists } = useContext(removeContext);
    const { setPlaylistIndex } = useContext(playlistIndexContext);
    const { setSongPlayer } = useContext(songIndexContext);
    const { title, url, imgUrl, _id } = { ...song }
    const removeSong = (playlist, song) => {
        // setPlaylists(prePlaylists => prePlaylists.map(list => { return console.log(list); }))
        const data = JSON.stringify({
            playlistId: playlist,
            songId: song
        });
        try {
            api.put('/playlists/deleteSong', data)
                .then(res => {
                    setPlaylists(res.data);
                    setPlaylistIndex(playlists.length - 1);
                });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <ListItem className='Song'
            secondaryAction={
                <Tooltip title="delete song" placement="right-start">
                    <IconButton edge="end" aria-label="delete"
                        onClick={() => {
                            removeSong(playlistId, _id);
                        }}>
                        <DeleteIcon className='delete_bt' />
                    </IconButton>
                </Tooltip>
            }>
            <span className='play_song'
                onClick={() => {
                    setSongPlayer(url);
                }}>
                <ListItemAvatar >
                    <Avatar
                        sx={{ width: 70, height: 70 }}
                    >
                        <img className='song_img' alt={title} src={imgUrl} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="description" />{title}
            </span>
        </ListItem >
    )
}
export default Song;