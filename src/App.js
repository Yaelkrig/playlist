import { useEffect, useRef, useState } from 'react';
import './App.css';
import "plyr-react/dist/plyr.css";
import Header from './components/Header/Header';
import ItemForm from './components/ItemForm/ItemForm';
import Player from './components/Player/Player';
import SongList from './components/SongList/SongList';
import SideBar from './components/SideBar/SideBar';
import SearchResults from "./components/SearchResults/SearchResults"
import youtube from './apis/youtube';
import ResultContext from './Contexts/ResultContext';


const App = () => {
  const songsList = [
    {
      artist: "אביחי הולנדר avihai hollender",
      id: "Peo8sewY1K4",
      imgUrl: "https://i.ytimg.com/vi/Peo8sewY1K4/default.jpg",
      name: "אביחי הולנדר - ברית | Avihai Hollender - Britt",
      url: "Peo8sewY1K4"
    },
    {
      artist: "Blue Pill Band",
      id: "UMNI_XAS1wc",
      imgUrl: "https://i.ytimg.com/vi/UMNI_XAS1wc/default.jpg",
      name: "הפיל הכחול - טיול",
      url: "UMNI_XAS1wc"
    },
    {
      artist: "Beit Avi Chai - בית אבי חי",
      id: "xc0jPvkX-Nc",
      imgUrl: "https://i.ytimg.com/vi/xc0jPvkX-Nc/default.jpg",
      name: "יונתן בלומנפלד וענת מלמוד - את הלילה שלך מרגיעים || Made in ג&#39;רוזלם",
      url: "xc0jPvkX-Nc"
    },
    {
      artist: "Keren Peles - קרן פלס",
      id: "EqPy5SCrD-A",
      imgUrl: "https://i.ytimg.com/vi/EqPy5SCrD-A/default.jpg",
      name: "קרן פלס - ימים אחרים",
      url: "EqPy5SCrD-A"
    },
  ]
  const [songs, setSongs] = useState(songsList)
  const [newSong, setNewSong] = useState("")
  const [songPlayer, setSongPlayer] = useState(songs[0].url)
  const inputRef = useRef(null)
  const [results, setResults] = useState([])


  useEffect(() => {
    inputRef.current.focus()
  })

  const addSong = (details) => {
    setSongs([...songs, {
      id: details.id.videoId,
      name: details.snippet.title,
      artist: details.snippet.channelTitle,
      url: details.id.videoId,
      imgUrl: details.snippet.thumbnails.default.url
    }])
    setNewSong("")
    console.log(songs);
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


  return (
    <div className="App">
      <Header />
      <SideBar />
      <Player url={songPlayer} />
      <ItemForm addSong={addSong} newSong={newSong} inputRef={inputRef} searchSong={searchSong} />
      <SearchResults results={results} playSong={playSong} addSongToPlaylist={addSong} />
      <SongList songs={songs} removeSong={removeSong} playSong={playSong} />
    </div>
  );
}


export default App;
