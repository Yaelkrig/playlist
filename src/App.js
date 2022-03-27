import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import PlaylistPlay from './components/PlaylistPlay/PlaylistPlay';
import About from './components/About/About';
import SideBar from './components/SideBar/SideBar';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import SongIndexContext from './Contexts/songIndexContext';
import PlaylistsContext from './Contexts/PlaylistsContext';
import PlaylistIndexContext from './Contexts/playlistIndexContext';
import removeContext from './Contexts/removeContext';
import api from './apis/axios_api';
import Help from './components/Help/Help';
import AboutMe from './components/AboutMe/AboutMe';
import UserAceessTokenContext from './Contexts/UserAceessTokenContext';
import IsHomePageContext from './Contexts/IsHomePageContext';


const App = () => {
  const [songPlayer, setSongPlayer] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [userAccessToken, setUserAccessToken] = useState(localStorage.accessToken);
  const [isHomePage, setIsHomePage] = useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00cedc',
      },
      secondary: {
        main: '#00cedc',
      },
    },
  });
  useEffect(() => {
    if (!playlists[0]) {
      try {
        setUserAccessToken(localStorage.accessToken);
        api.get('/playlists/uesr')
          .then(songs => {
            if (songs.data.message[0] === undefined) return setPlaylistIndex(-1);
            songs.data.message.map(playlist => {
              return setPlaylists(prevPlaylists => [...prevPlaylists, playlist])
            })
          })
        // if (!rememberUser)  handleLogOut();
      } catch (e) {
        console.log(e);
      }
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <UserAceessTokenContext.Provider value={{ userAccessToken, setUserAccessToken }}>
        <SongIndexContext.Provider value={{ songPlayer, setSongPlayer }}>
          <PlaylistsContext.Provider value={{ playlists, setPlaylists }}>
            <PlaylistIndexContext.Provider value={{ playlistIndex, setPlaylistIndex }}>
              <removeContext.Provider value={{ setPlaylists }}>
                <IsHomePageContext.Provider value={{ isHomePage, setIsHomePage }}>
                  <Router className="App">
                    <Header />
                    <SideBar />
                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route exact path="/playlist/:id" element={<PlaylistPlay />} />
                      <Route exact path="/Login" element={<Login />} />
                      <Route exact path="/SignUp" element={<SignUp />} />
                      <Route exact path="/help" element={<Help />} />
                      <Route exact path="/about" element={<AboutMe />} />
                    </Routes>
                    <About />
                  </Router>
                </IsHomePageContext.Provider>
              </removeContext.Provider>
            </PlaylistIndexContext.Provider>
          </PlaylistsContext.Provider>
        </SongIndexContext.Provider>
      </UserAceessTokenContext.Provider>
    </ThemeProvider>
  )
}



export default App;
