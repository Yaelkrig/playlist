import './Song.css'
const Song = ({ id, name, imgUrl, artist, url, removeSong, playSong, index }) => {

    return (
        <div key={id} className="Song" id={id}>
            <img alt={name} src={imgUrl} />

            <span className='name'>{name}</span>
            <span className='artist'> By- {artist}</span>

            <div className='buttons'>

                <button className='remove_button'
                    onClick={() => {
                        removeSong(id)
                    }}></button>
                <button className='play_button'
                    onClick={() => {
                        playSong(url)
                    }}
                ></button>
            </div>
        </div >
    )
}
export default Song;
