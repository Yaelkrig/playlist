import { useState } from "react/cjs/react.development";
import ItemForm from "../ItemForm/ItemForm";
import Song from "../Song/Song";
import './SongList.css'
const SongList = ({ songs, removeSong, playSong }) => {
    const [display, setDisplay] = useState(true)
    return (
        <div className="SongList">
            <h3>
                <button className={display ? "hide" : "show"} id="display"
                    onClick={() => setDisplay(!display)}></button>
                playlist</h3>

            {display && songs.map((song, index) => {
                return <Song key={song.id} id={song.id} name={song.name} artist={song.artist} index={index} url={song.url} removeSong={removeSong} playSong={playSong} />
            }
            )}

        </div>
    )
}
export default SongList;