import './Home.css'
import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import playlistIndexContest from '../../Contexts/playlistIndexContext';
import removeContext from '../../Contexts/removeContext';
import Header from '../Header/Header';
import Player from '../Player/Player';
import SongList from '../SongList/SongList';
import SideBar from '../SideBar/SideBar';
import About from '../About/About';
import Search from '../Search/Search';
import api from '../../apis/axios_api';

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
    const [songPlayer, setSongPlayer] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    // const [rememberUser, setRememberUser] = useState(false);

    useEffect(() => {
        if (!playlists[0]) {
            try {
                api.get('/playlists/uesr')
                    .then(songs => {
                        if (songs.data.message[0] === undefined) return setPlaylistIndex(-1);
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

    const playSong = (url) => {
        setSongPlayer(url);
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="Home">
                <Header />
                <SideBar />
                <Player url={songPlayer} />
                <playlistIndexContest.Provider value={{ playlistIndex, setPlaylistIndex }}>
                    <Search playSong={playSong} playlists={playlists} setPlaylists={setPlaylists} />
                    <removeContext.Provider value={{ setPlaylists }}>
                        <SongList lists={playlists} playSong={playSong} />
                    </removeContext.Provider>
                </playlistIndexContest.Provider>
                <About />
            </div>
        </ThemeProvider>
    );
}

export default Home;