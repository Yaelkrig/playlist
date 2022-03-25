import './Home.css'
import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Player from '../Player/Player';
import SongList from '../SongList/SongList';
import Search from '../Search/Search';
import api from '../../apis/axios_api';
import playlistIndexContest from '../../Contexts/playlistIndexContext';
import removeContext from '../../Contexts/removeContext';
import SongIndexContext from '../../Contexts/songIndexContext';
import PlaylistsContext from '../../Contexts/PlaylistsContext';
const Home = () => {
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
    const [songPlayer, setSongPlayer] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    // const [rememberUser, setRememberUser] = useState(false);
    console.log('home render');
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
                // if (!rememberUser)  handleLogOut();
            } catch (e) {
                console.log(e);
            }
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <SongIndexContext.Provider value={{ songPlayer, setSongPlayer }}>
                <Player />
                <PlaylistsContext.Provider value={{ playlists, setPlaylists }}>
                    <playlistIndexContest.Provider value={{ playlistIndex, setPlaylistIndex }}>
                        <Search />
                        <removeContext.Provider value={{ setPlaylists }}>
                            <SongList />
                        </removeContext.Provider>
                    </playlistIndexContest.Provider>
                </PlaylistsContext.Provider>
            </SongIndexContext.Provider>
        </ThemeProvider>
    );
}

export default Home;