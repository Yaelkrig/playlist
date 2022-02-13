import { Grid, IconButton, Input, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { useState } from "react/cjs/react.development";
import Song from "../Song/Song";
import './SongList.css'
import AddIcon from '@mui/icons-material/Add';
import { useRef, useContext } from "react";
import removeContext from "../../Contexts/removeContext";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';
import playlistIndexContext from "../../Contexts/playlistIndexContext";

const SongList = ({ playSong, lists }) => {
    const { setPlaylists } = useContext(removeContext)
    const { setPlaylistIndex } = useContext(playlistIndexContext)
    const [playlistName, setPlaylistName] = useState("")
    const [value, setValue] = useState(0);
    const newPlaylistRef = useRef(null);
    console.log('^^^^^^', value);
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
                    setPlaylists(prePlaylists => [...prePlaylists, data.message]);
                }
                );
        } catch (e) {
            console.log(e);
        }
    }
    const removeSong = () => {
        setPlaylists(prePlaylists => prePlaylists.map(list => { return console.log(list); }))
        try {
            fetch('http://localhost:3001/playlists/deleteSong',
                {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWZmZjZmMTRhMTcwODE2N2YxNjg2OTMiLCJ1c2VybmFtZSI6InlhZWwiLCJlbWFpbCI6InlhZWxrcmlnQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDItMDZUMTY6Mjc6MjkuNjYxWiIsIl9fdiI6MH0.v2pMaAap9V96GAkVkSqNWkolMS4E5XXKI0Cxno0gjmg`
                    },
                    body: JSON.stringify({
                        playlistId: "",
                        songId: ""
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
    const a11yProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPlaylistIndex(value);
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
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
                        <IconButton onClick={() => {
                            addPlaylist();
                            setPlaylistName("");
                        }}>
                            <AddIcon className="add_playlist" fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
                <Box className="playlists_container">
                    {lists[0] &&
                        <Tabs className="title"
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            {lists.map((playlist, i) => {
                                return (
                                    <Tab key={i} label={playlist.title} {...a11yProps(i)} ></Tab>
                                )
                            })}
                        </Tabs>}

                    {lists.map((list, index) => {
                        return (<TabPanel value={value} index={index}>
                            <div className="list" id={index} key={list._id}>
                                <div className="songs_container">
                                    {list.songs.map((song, index) => {
                                        return <Song key={song.id} value={value} song={song} index={index} removeSong={removeSong} playSong={playSong} />
                                    })}
                                </div>
                            </div>
                        </TabPanel>
                        )
                    })}


                </Box>
            </div>
        </Grid>
    )
}
export default SongList;