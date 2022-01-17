import { useState } from "react/cjs/react.development";
import Song from "../Song/Song";
import './SongList.css'
const SongList = ({ songs, removeSong, playSong }) => {
    console.log(songs);
    const [display, setDisplay] = useState(true)
    return (
        <div className="SongList">
            <div className="playlist_header">
                <h3>playlist </h3>
                <button className={display ? "hide" : "show"} id="display"
                    onClick={() => setDisplay(!display)}></button>
            </div>
            <div className="songs_container">
                {display && songs.map((song, index) => {
                    return <Song key={song.id} id={song.id} imgUrl={song.imgUrl} name={song.name} artist={song.artist} index={index} url={song.url} removeSong={removeSong} playSong={playSong} />
                }
                )}
            </div>

        </div>
    )
}
export default SongList;