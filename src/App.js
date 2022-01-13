import { useEffect, useRef, useState } from 'react';
import './App.css';
import "plyr-react/dist/plyr.css";
import Header from './components/Header/Header';
import ItemForm from './components/ItemForm/ItemForm';
import Player from './components/Player/Player';
import SongList from './components/SongList/SongList';

const App = () => {
  const songsList = [
    { id: 1, name: 'Brit', artist: 'Hol', url: 'Peo8sewY1K4' },
    { id: 2, name: 'Tule', artist: 'Blue Pill', url: 'UMNI_XAS1wc' },
    { id: 3, name: 'Isha Harsina', artist: 'Miri Mesika', url: 'K8g3iu7Hu4Q' },
    { id: 4, name: 'Ein Sof Lalaila', artist: 'Kern Peles', url: '-nmPdZDg4Ws' },
    { id: 5, name: 'Hallelojah', artist: 'The Next Star', url: 'irEpp0NsgkI' },
  ]
  const [songs, setSongs] = useState(songsList)
  const [newSong, setNewSong] = useState("")
  const [songsUrl, setSongsUrl] = useState(songs.map(song => `https://www.youtube.com/watch?v=${song.url}`))
  const [songIndex, setSongIndex] = useState(0)
  const idRef = useRef(songs.length)
  const inputRef = useRef(null)


  useEffect(() => {
    inputRef.current.focus()
  })
  const addSong = (inputValue, inputArtist, inputUrl) => {
    idRef.current++
    setSongs([...songs, {
      id: idRef.current,
      name: inputValue,
      artist: inputArtist,
      url: inputUrl
    }])

    setSongsUrl([...songsUrl, `https://www.youtube.com/watch?v=${inputUrl}`])
    setNewSong("")

  }
  const playSong = (index) => {
    setSongIndex(index)

  }


  const removeSong = (id) => {
    setSongs(songs.filter(song => song.id !== id))
  }
  const handleEnded = () => {
    console.log('ended');
    setSongIndex(songIndex + 1)
  }

  return (
    <div className="App">
      <Header />
      <ItemForm addSong={addSong} newSong={newSong} inputRef={inputRef} />
      <SongList songs={songs} removeSong={removeSong} playSong={playSong} />
      <Player urls={songsUrl} index={songIndex} handleEnded={handleEnded} />
    </div>
  );
}


export default App;
