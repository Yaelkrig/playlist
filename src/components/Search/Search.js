import './Search.css'
import ItemForm from '../ItemForm/ItemForm'
import SearchResults from '../SearchResults/SearchResults';
import youtube from '../../apis/youtube';
import { useState } from 'react';
import axios from 'axios';


const Search = ({ playSong, playlists, setPlaylists }) => {
    const [results, setResults] = useState([]);
    const userToken = localStorage.accessToken;

    const searchSong = async (forSearch) => {
        const res = await youtube.get('/search', {
            params: {
                q: forSearch
            }
        })
        setResults(res.data.items)
    }
    const addSong = (details, index) => {
        if (playlists[index]) {
            const data = JSON.stringify({
                ...details,
                playlist: playlists[index]._id
            })
            try {
                axios.post('http://localhost:3001/songs/add', data,
                    {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `bearer ${userToken}`
                        },
                    })
                    .then(res => {
                        setPlaylists(res.data)
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            return true;
        }
    }
    return (
        <div className='Search'>
            <ItemForm addSong={addSong} searchSong={searchSong} />
            <SearchResults results={results} playSong={playSong} addSongToPlaylist={addSong} />
        </div>
    )
}
export default Search;