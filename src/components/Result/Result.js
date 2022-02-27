
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import './Result.css'
import AddIcon from '@mui/icons-material/Add';
import playlistIndexContext from '../../Contexts/playlistIndexContext';
import { useContext } from 'react';

const Result = ({ details, playSong, addSong }) => {
    const { playlistIndex } = useContext(playlistIndexContext)
    const title = details.snippet.title
    const songUrl = details.id.videoId
    const imgUrl = details.snippet.thumbnails.default.url
    let songToAdd = {};
    let disButton;
    playlistIndex === -1 ? disButton = true : disButton = false;
    return (
        <ListItem className='Result'
            secondaryAction={
                <IconButton edge="end" aria-label="delete"
                    disabled={disButton}
                >
                    <AddIcon
                        onClick={() => {
                            songToAdd = {
                                id: details.id.videoId,
                                title: details.snippet.title,
                                artist: details.snippet.channelTitle,
                                url: details.id.videoId,
                                imgUrl: details.snippet.thumbnails.default.url,
                            }
                            addSong(songToAdd, playlistIndex);
                        }}
                    />
                </IconButton>
            }
        >
            <span className='play_song'
                onClick={() => {
                    playSong(songUrl)
                }}
            >
                <ListItemAvatar >
                    <Avatar sx={{ width: 65, height: 65 }}>
                        <img className='song_img' alt={title} src={imgUrl} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="description" />{title}
            </span>
        </ListItem >
    )
}

export default Result;