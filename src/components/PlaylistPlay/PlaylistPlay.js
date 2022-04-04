import "./PlaylistPlay.css";
import Search from "../Search/Search";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import PlaylistsContext from "../../Contexts/PlaylistsContext";
import Player from "../Player/Player";
import SongList from "../SongList/SongList";
import songIndexContext from "../../Contexts/songIndexContext";
import playPlaylistIndexContext from "../../Contexts/playPlaylistIndexContext";

const PlaylistPlay = () => {
    const { playPlaylist, setPlayPlaylist } = useContext(playPlaylistIndexContext)
    const { setSongPlayer } = useContext(songIndexContext);

    useEffect(() => {
        setSongPlayer(playPlaylist.songs.length > 0 ? playPlaylist.songs[0].url : null);
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Player />
            <Search className="play_search" />
            <SongList />
        </>
    )
}
export default PlaylistPlay;