import './Search.css'
import ItemForm from '../ItemForm/ItemForm'
import SearchResults from '../SearchResults/SearchResults';
import { useState } from 'react';


const Search = () => {
    console.log('search render');
    const [results, setResults] = useState([]);

    return (
        <div className='Search'>
            <ItemForm setResults={setResults} />
            <SearchResults results={results} />
        </div>
    )
}
export default Search;