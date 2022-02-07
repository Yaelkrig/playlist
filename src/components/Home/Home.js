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
    const userToken = { accessToken: localStorage.accessToken }
    const [playlists, setPlaylists] = useState([]);

    const userLoged = () => {
        // to check if this is the better sollution
        if (userToken !== {}) {
            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userToken),
            })
                .then((res) => res.json())
                .then((data) => {
                    setCurrentUser(data.username)
                })
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:3001/playlists/uesr', {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWZmZjZmMTRhMTcwODE2N2YxNjg2OTMiLCJ1c2VybmFtZSI6InlhZWwiLCJlbWFpbCI6InlhZWxrcmlnQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsIl9fdiI6MH0.v2pMaAap9V96GAkVkSqNWkolMS4E5XXKI0Cxno0gjmg`
                },
            })
                .then(res => res.json())
                .then(songs => {
                    if (songs.message[0] === undefined) return;
                    console.log(songs.message);
                    songs.message.map(playlist => {
                        return setPlaylists(prevPlaylists => [...prevPlaylists, playlist])
                    })
                    console.log(playlists);
                    setSongPlayer(playlists[0].songs[0].url)
                })

        } catch (e) {
            console.log(e);
        }

    }, [])

    useEffect(() => {
        inputRef.current.focus()
    })
    useEffect(() => {
        userLoged()
    }, [userToken])


    const addSong = (details) => {
        console.log({
            id: details.id.videoId,
            title: details.snippet.title,
            artist: details.snippet.channelTitle,
            url: details.id.videoId,
            imgUrl: details.snippet.thumbnails.default.url,
            playlist: "6200f13f47b5e6904b48ed0b"
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
                        id: details.id.videoId,
                        title: details.snippet.title,
                        artist: details.snippet.channelTitle,
                        url: details.id.videoId,
                        imgUrl: details.snippet.thumbnails.default.url,
                        playlist: "6200f13f47b5e6904b48ed0b"
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

    const removeSong = (id) => {
        setSongs(songs.filter(song => song.id !== id))
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
                <SearchResults results={results} playSong={playSong} addSongToPlaylist={addSong} />
                <SongList songs={songs} lists={playlists} removeSong={removeSong} playSong={playSong} />
                <About />
            </div>
        </ThemeProvider>
    );
}

export default Home;