import './Song.css'
const Song = ({ id, name, artist, url, removeSong, playSong, index }) => {

    return (
        <div key={id} className="Song" id={id}>
            {/* <img className='playing' url="../../../images/music.gif" alt='playing' /> */}
            <div className='description'>
                <span className='name'>{name}</span>
                <span className='artist'> By- {artist}</span>
            </div>
            <div className='buttons'>

                <button className='remove_button'
                    onClick={() => {
                        removeSong(id)
                    }}></button>
                <button className='play_button'
                    onClick={() => {
                        playSong(index)
                    }}
                ></button>
            </div>
        </div >
    )
}
export default Song;
