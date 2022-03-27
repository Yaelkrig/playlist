
import Result from "../Result/Result";
import "./SearchResults.css"

const SearchResults = ({ results, setResults }) => {

    return (
        <div className="SearchResults">
            {results.length > 0 &&
                results.map((result) => {
                    return (<Result key={result.id ? result.id.videoId : result._id} details={result} setResults={setResults} />)
                })}
        </div>
    )
}

export default SearchResults;