import "./PlaylistPlay.css";
import Search from "../Search/Search";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import PlaylistsContext from "../../Contexts/PlaylistsContext";
import Player from "../Player/Player";
import SongList from "../SongList/SongList";
import songIndexContext from "../../Contexts/songIndexContext";

const PlaylistPlay = () => {
    const { id } = useParams();
    const { playlists } = useContext(PlaylistsContext);
    const { setSongPlayer } = useContext(songIndexContext);
    const playlist = playlists.filter(playlist => playlist._id === id)[0];
    setSongPlayer(playlist.songs.length > 0 ? playlist.songs[0].url : null);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Player playlist={playlist} />
            <Search className="play_search" />
            <SongList playlist={playlist} />
        </>
    )
}
export default PlaylistPlay;