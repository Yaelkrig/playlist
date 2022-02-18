import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import './Song.css'
import DeleteIcon from '@mui/icons-material/Delete';
const Song = ({ song, removeSong, playSong, index, value, playlistId }) => {
    const { title, url, imgUrl, _id } = { ...song }

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
                    playSong(url)
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