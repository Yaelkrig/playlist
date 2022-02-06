
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import './Result.css'
import AddIcon from '@mui/icons-material/Add';

const Result = ({ details, playSong, addSong }) => {

    const title = details.snippet.title
    const songUrl = details.id.videoId
    const imgUrl = details.snippet.thumbnails.default.url

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <AddIcon
                        onClick={() => { addSong(details) }} />
                </IconButton>
            }
        >
            <span className='play_song'
                onClick={() => {
                    console.log(songUrl);
                    playSong(songUrl)
                }}
            >
                <ListItemAvatar >
                    <Avatar
                        sx={{ width: 65, height: 65 }}
                    >
                        <img className='song_img' alt={title} src={imgUrl} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText className="description" />{title}
            </span>
        </ListItem >

    )




    // <div className='Result'>
    //     <img alt={title} src={imgUrl} className='result_img' />
    //     <span className='title'>
    //         {title}
    //     </span>
    //     <button className='play_button'
    //         onClick={() => { playSong(songUrl) }}></button>
    //     <button className='addToPlaylist'
    //         onClick={() => { addSong(details) }}></button>
    // </div >
}

export default Result;