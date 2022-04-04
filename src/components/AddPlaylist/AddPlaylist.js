import { IconButton, Input, TextField, Tooltip } from "@mui/material"
import "./AddPlaylist.css"
import AddIcon from '@mui/icons-material/Add';
import api from "../../apis/axios_api";
import { useContext, useState } from "react";
import removeContext from "../../Contexts/removeContext";
import PlaylistsContext from "../../Contexts/PlaylistsContext";
import { useNavigate } from "react-router";
import playPlaylistIndexContext from "../../Contexts/playPlaylistIndexContext";


const AddPlaylist = ({ setAddPlay }) => {
    const { setPlayPlaylist } = useContext(playPlaylistIndexContext)
    const { playlists, setPlaylists } = useContext(PlaylistsContext);
    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate()

    const addPlaylist = () => {
        console.log(playlistName);
        try {
            const add = {
                title: playlistName,
                songs: []
            }
            api.post('/playlists/newPlaylist', add)
                .then(res => {
                    setPlaylists(res.data.message);
                    setPlayPlaylist(res.data.message[res.data.message.length - 1])
                    navigate(`/playlist/${res.data.message[res.data.message.length - 1]._id}`)
                }
                );
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="add_container">
            <div className="add_card">
                <button className="exit_add" onClick={() => setAddPlay(false)}>x</button>
                <div className="add_form">
                    <Input
                        id="playlist_name_input"
                        placeholder="Your Playlist Name"
                        variant="standard"
                        onChange={(e) => { setPlaylistName(e.target.value) }}
                        value={playlistName}
                    >
                    </Input>
                    <Tooltip title="create playlist" placement="right-start">
                        <IconButton onClick={(e) => {
                            addPlaylist();
                            setPlaylistName("");
                        }}>
                            <AddIcon className="add_playlist" fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default AddPlaylist;