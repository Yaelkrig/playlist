import Result from "../Result/Result";
import "./SearchResults.css"

const SearchResults = ({ results, playSong, addSongToPlaylist }) => {

    let displayResults = ""
    if (results !== []) {
        displayResults = results
    } else {
        displayResults = "";
    }
    return (
        <div className="SearchResults">
            {results !== [] ?
                results.map((result) => <Result key={result.id.videoId} details={result} playSong={playSong} addSong={addSongToPlaylist} />) : displayResults}

        </div>
    )
}

export default SearchResults;