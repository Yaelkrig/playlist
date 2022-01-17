
import './Result.css'

const Result = ({ details, playSong, addSong }) => {

    const title = details.snippet.title
    const songUrl = details.id.videoId
    const imgUrl = details.snippet.thumbnails.default.url

    return <div className='Result'>
        <img alt={title} src={imgUrl} />
        <span className='title'>
            {title}
        </span>
        <button className='play_button'
            onClick={() => { playSong(songUrl) }}></button>
        <button className='addToPlaylist'
            onClick={() => { addSong(details) }}></button>
    </div >
}

export default Result;