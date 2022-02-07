import { Grid, Input, Tooltip } from "@mui/material";
import { useState } from "react/cjs/react.development";
import Song from "../Song/Song";
import './SongList.css'
import AddIcon from '@mui/icons-material/Add';
import { useRef } from "react";

const SongList = ({ removeSong, playSong, lists }) => {
    const [display, setDisplay] = useState(true);
    const [playlistName, setPlaylistName] = useState("")
    const newPlaylistRef = useRef(null);
    const addPlaylist = () => {
        try {
            fetch('http://localhost:3001/playlists/newPlaylist',
                {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWZmZjZmMTRhMTcwODE2N2YxNjg2OTMiLCJ1c2VybmFtZSI6InlhZWwiLCJlbWFpbCI6InlhZWxrcmlnQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsIl9fdiI6MH0.v2pMaAap9V96GAkVkSqNWkolMS4E5XXKI0Cxno0gjmg`
                    },
                    body: JSON.stringify({
                        title: playlistName,
                        songs: []
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                }
                );
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Grid item xs={10} md={16}>
            <div className="SongList" >
                <div className="add_container">
                    <Input
                        ref={newPlaylistRef}
                        id="playlist_input"
                        label="Create New Playlist"
                        // value={setUsernameValue(usernameValue)}
                        name="newPlaylist"
                        onChange={(e) => { setPlaylistName(e.target.value) }}
                        value={playlistName}
                        color='success'
                    ></Input>
                    <Tooltip title="create playlist" placement="right-start">
                        <AddIcon className="add_playlist" fontSize="large"
                            onClick={() => {
                                addPlaylist();
                                setPlaylistName("");
                            }} />
                    </Tooltip>
                </div>
                {lists.map((list, index) => {
                    return (
                        <div className="list" id={index} key={list.id}>
                            <div className="playlist_header">
                                <h3>{list.title} </h3>
                                <button className={display ? "hide" : "show"} id="display"
                                    onClick={() => setDisplay(!display)}></button>
                            </div>
                            <div className="songs_container">
                                {display && list.songs.map((song, index) => {
                                    return <Song key={song.id} id={song.id} imgUrl={song.imgUrl} title={song.title} artist={song.artist} index={index} url={song.url} removeSong={removeSong} playSong={playSong} />
                                })}
                            </div>
                        </div>
                    )
                }
                )
                }

            </div>
        </Grid>
    )
}
export default SongList;