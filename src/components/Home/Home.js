import './Home.css'
import { useEffect, useRef, useState } from 'react';
import "plyr-react/dist/plyr.css";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import playlistIndexContest from '../../Contexts/playlistIndexContext';
import removeContext from '../../Contexts/removeContext';
import axios from 'axios';
import Header from '../Header/Header';
import ItemForm from '../ItemForm/ItemForm';
import Player from '../Player/Player';
import SongList from '../SongList/SongList';
import SideBar from '../SideBar/SideBar';
import SearchResults from "../SearchResults/SearchResults"
import youtube from '../../apis/youtube';
import About from '../About/About';
// import ResultContext from './Contexts/ResultContext';
const theme = createTheme({
    palette: {
        primary: {
            main: '#d35c89',
        },
        secondary: {
            main: '#616161',
        },
    },
});
const Home = () => {
    const [newSong, setNewSong] = useState("");
    const [songPlayer, setSongPlayer] = useState("");
    const inputRef = useRef(null);
    const [results, setResults] = useState([]);
    const [currentUser, setCurrentUser] = useState("Guest");
    const userToken = localStorage.accessToken;
    const [playlists, setPlaylists] = useState([]);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    // const [rememberUser, setRememberUser] = useState(false);

    const userLoged = () => {
        if (userToken) {
            setCurrentUser(JSON.parse(atob(userToken.split(".")[1])).username)
        }
    }
    useEffect(() => {
        if (!playlists[0]) {
            try {
                axios.get('http://localhost:3001/playlists/uesr', {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${userToken}`
                    },
                })
                    .then(songs => {
                        if (songs.data.message[0] === undefined) return;
                        songs.data.message.map(playlist => {
                            return setPlaylists(prevPlaylists => [...prevPlaylists, playlist])
                        })
                        setSongPlayer(songs.data.message[0].songs[0].url)
                    })
                // if (!rememberUser) {
                //     return handleLogOut();
                // }
            } catch (e) {
                console.log(e);
            }
        }
    }, [])

    useEffect(() => {
        inputRef.current.focus();
    })
    useEffect(() => {
        userLoged();
    }, [userToken])

    const addSong = (details, index) => {
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
            setNewSong("")
        } catch (e) {
            console.log(e);
        }
    }
    const searchSong = async (forSearch) => {
        const res = await youtube.get('/search', {
            params: {
                q: forSearch
            }
        })
        setResults(res.data.items)
    }

    const playSong = (url) => {
        setSongPlayer(url)
    }

    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        setCurrentUser('Guest')
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="Home">
                <Header currentUser={currentUser} />
                <SideBar handleLogOut={handleLogOut} />
                <Player url={songPlayer} />
                <ItemForm addSong={addSong} newSong={newSong} inputRef={inputRef} searchSong={searchSong} />
                <playlistIndexContest.Provider value={{ playlistIndex, setPlaylistIndex }}>
                    <SearchResults results={results} playSong={playSong} addSongToPlaylist={addSong} />
                    <removeContext.Provider value={{ setPlaylists }}>
                        <SongList lists={playlists} playSong={playSong} />
                    </removeContext.Provider>
                </playlistIndexContest.Provider>
                <div className='about'>
                    <About />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Home;