import './Home.css'
import { useEffect, useRef, useState } from 'react';
import "plyr-react/dist/plyr.css";
import Header from '../Header/Header';
import ItemForm from '../ItemForm/ItemForm';
import Player from '../Player/Player';
import SongList from '../SongList/SongList';
import SideBar from '../SideBar/SideBar';
import SearchResults from "../SearchResults/SearchResults"
import youtube from '../../apis/youtube';
import About from '../About/About';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import removeContext from '../../Contexts/removeContext';
import playlistIndexContest from '../../Contexts/playlistIndexContext';
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
    const [songs, setSongs] = useState([])
    const [newSong, setNewSong] = useState("")
    const [songPlayer, setSongPlayer] = useState("")
    const inputRef = useRef(null)
    const [results, setResults] = useState([])
    const [currentUser, setCurrentUser] = useState("Guest")
    const userToken = localStorage.accessToken
    const [playlists, setPlaylists] = useState([]);
    const [playlistIndex, setPlaylistIndex] = useState(0)
    // const [rememberUser, setRememberUser] = useState(false);

    const userLoged = () => {
        // to check if this is the better sollution

        if (userToken) {
            setCurrentUser(JSON.parse(atob(userToken.split(".")[1])).username)
        }
    }
    useEffect(() => {
        if (!playlists[0]) {
            try {
                fetch('http://localhost:3001/playlists/uesr', {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${userToken}`
                    },
                })
                    .then(res => res.json())
                    .then(songs => {
                        if (songs.message[0] === undefined) return;
                        console.log(songs.message);
                        songs.message.map(playlist => {
                            return setPlaylists(prevPlaylists => [...prevPlaylists, playlist])
                        })
                        setSongPlayer(songs.message[0].songs[0].url)
                    })
                // if (!rememberUser) {
                //     return handleLogOut();
                // }

            } catch (e) {
                console.log(e);
            }
        }
    }, [playlists])

    useEffect(() => {
        inputRef.current.focus()
    })
    useEffect(() => {
        userLoged()
    }, [userToken])


    const addSong = (details, index) => {
        console.log(index);
        console.log('index', playlists[index - 1]);

        console.log({
            ...details,
            playlist: playlists[index - 1]._id
        });
        try {
            fetch('http://localhost:3001/songs/add',
                {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWZmZjZmMTRhMTcwODE2N2YxNjg2OTMiLCJ1c2VybmFtZSI6InlhZWwiLCJlbWFpbCI6InlhZWxrcmlnQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsIl9fdiI6MH0.v2pMaAap9V96GAkVkSqNWkolMS4E5XXKI0Cxno0gjmg`
                    },
                    body: JSON.stringify({
                        ...details,
                        playlist: playlists[index]._id
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    playlists.map(playlist => {
                        return playlist.id === "6200f13f47b5e6904b48ed0b" ? playlist.songs.push(data) : console.log('error');
                    })
                    console.log("data", data);
                    setSongs([...songs, data])
                }
                );

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
        console.log('from home');
        localStorage.removeItem("accessToken");
        setCurrentUser('Guest')
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="Home">
                <Header />
                <span className='name'>Hello {currentUser},</span>
                <SideBar handleLogOut={handleLogOut} />
                <Player url={songPlayer} />
                <ItemForm addSong={addSong} newSong={newSong} inputRef={inputRef} searchSong={searchSong} />
                <playlistIndexContest.Provider value={{ playlistIndex, setPlaylistIndex }}>
                    <SearchResults results={results} playSong={playSong} addSongToPlaylist={addSong} />
                    <removeContext.Provider value={{ setPlaylists }}>
                        <SongList songs={songs} lists={playlists} playSong={playSong} />
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