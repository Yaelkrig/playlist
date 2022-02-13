import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import './Song.css'
import DeleteIcon from '@mui/icons-material/Delete';
const Song = ({ song, removeSong, playSong, index, value }) => {
    const { title, url, imgUrl } = { ...song }
    return (
        <ListItem
            secondaryAction={
                <Tooltip title="delete song" placement="right-start">
                    <IconButton edge="end" aria-label="delete"
                        onClick={() => {
                            console.log("delete", url);
                            removeSong(url);
                        }}>
                        <DeleteIcon className='delete_bt' />
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
