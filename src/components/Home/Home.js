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


    const userLoged = () => {
        // setUserToken({ accessToken: localStorage.accessToken })
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
        fetch('http://localhost:3001/songs', {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(songs => {
                setSongs([...songs])
                setSongPlayer(songs[0].url);
            })

    }, [])

    useEffect(() => {
        inputRef.current.focus()
    })
    useEffect(() => {
        userLoged()
    }, [userToken])


    const addSong = (details) => {
        fetch('http://localhost:3001/songs',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    id: details.id.videoId,
                    title: details.snippet.title,
                    artist: details.snippet.channelTitle,
                    url: details.id.videoId,
                    imgUrl: details.snippet.thumbnails.default.url
                }),
            })
            .then(res => res.json())
            .then(data => console.log(data))

        setSongs([...songs, {
            id: details.id.videoId,
            title: details.snippet.title,
            artist: details.snippet.channelTitle,
            url: details.id.videoId,
            imgUrl: details.snippet.thumbnails.default.url
        }])
        setNewSong("")

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
                <SongList songs={songs} removeSong={removeSong} playSong={playSong} />
                <About />
            </div>
        </ThemeProvider>
    );
}

export default Home;