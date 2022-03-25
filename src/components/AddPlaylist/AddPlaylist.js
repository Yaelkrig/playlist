import { IconButton, Input, Tooltip } from "@mui/material"
import "./AddPlaylist.css"
import AddIcon from '@mui/icons-material/Add';
import api from "../../apis/axios_api";
import { useContext } from "react";
import removeContext from "../../Contexts/removeContext";


const AddPlaylist = ({ newPlaylistRef, playlistName, setPlaylistName, setIsAddPlaylist }) => {
    const { setPlaylists } = useContext(removeContext);

    const addPlaylist = () => {
        try {
            const add = {
                title: playlistName,
                songs: []
            }
            api.post('/playlists/newPlaylist', add)
                .then(data => {
                    setPlaylists(data.data.message);
                }
                );
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>        <div className="add_container">
            <form>
                <Input
                    ref={newPlaylistRef}
                    id="playlist_input"
                    label="Create New Playlist"
                    name="newPlaylist"
                    placeholder="Add New Playlist"
                    onChange={(e) => { setPlaylistName(e.target.value) }}
                    value={playlistName}
                    color='success'
                ></Input>
                <Tooltip title="create playlist" placement="right-start">
                    <IconButton onClick={(e) => {
                        e.preventDefault()
                        addPlaylist();
                        setPlaylistName("");
                        setIsAddPlaylist(false)
                    }}>
                        <AddIcon className="add_playlist" fontSize="large" />
                    </IconButton>
                </Tooltip>
            </form>
        </div></div>
    )
}

export default AddPlaylist;