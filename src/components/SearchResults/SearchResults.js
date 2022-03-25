
import Result from "../Result/Result";
import "./SearchResults.css"

const SearchResults = ({ results }) => {

    return (
        <div className="SearchResults">
            {results.length > 0 ?
                results.map((result) => {
                    return (<Result key={result.id.videoId} details={result} />)
                }) : null}
        </div>
    )
}

export default SearchResults;