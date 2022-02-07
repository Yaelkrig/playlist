import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import './Song.css'
import DeleteIcon from '@mui/icons-material/Delete';
const Song = ({ id, title, imgUrl, artist, url, removeSong, playSong, index }) => {
    return (
        <ListItem
            secondaryAction={
                <Tooltip title="delete song" placement="right-start">
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon className='delete_bt'
                            onClick={() => {
                                console.log("delete", url);
                                removeSong(url);
                            }}
                        />
                    </IconButton>
                </Tooltip>
            }
        >
            <span className='play_song'
                onClick={() => {
                    console.log(url);
                    playSong(url)
                }}
            >
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



        // <div key={id} className="Song" id={id}>
        //     <img className='song_img' alt={title} src={imgUrl} />
        //     <span className='name'>{title}</span>
        //     <div className='buttons'>
        //         <button className='remove_button'
        //             onClick={() => {
        //                 removeSong(id)
        //             }}></button>
        //         <button className='play_button'
        //             onClick={() => {
        //                 playSong(url)
        //             }}
        //         ></button>
        //     </div>
        // </div >
    )
}
export default Song;
