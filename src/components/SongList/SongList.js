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
import axios from "axios";

const SongList = ({ playSong, lists }) => {
    const userToken = localStorage.accessToken;
    const { setPlaylists } = useContext(removeContext)
    const { setPlaylistIndex } = useContext(playlistIndexContext)
    const [playlistName, setPlaylistName] = useState("")
    const [value, setValue] = useState(0);
    const newPlaylistRef = useRef(null);
    const addPlaylist = () => {
        try {
            const add = {
                title: playlistName,
                songs: []
            }
            axios.post('http://localhost:3001/playlists/newPlaylist', add,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${userToken}`
                    },
                })
                .then(data => {
                    setPlaylists(data.data.message);

                }
                );
        } catch (e) {
            console.log(e);
        }
    }
    const removeSong = (playlist, song) => {
        // setPlaylists(prePlaylists => prePlaylists.map(list => { return console.log(list); }))
        const data = JSON.stringify({
            playlistId: playlist,
            songId: song
        });
        try {
            axios.put('http://localhost:3001/playlists/deleteSong', data,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `bearer ${userToken}`
                    },
                })
                .then(res => {
                    setPlaylists(res.data);
                    setPlaylistIndex(lists.length - 1);
                });
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
        setPlaylistIndex(newValue);
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

                <Box className="playlists_container">
                    {lists[0] ?
                        <Tabs className="title"
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            {lists[0] && lists.map((playlist, i) => {
                                return (
                                    <Tab key={playlist.title} label={playlist.title} {...a11yProps(i)} ></Tab>
                                )
                            })}
                            <Tab label='*add playlist*'></Tab>
                        </Tabs>
                        : <div className="message">
                            ***** There is no playlists to add to. Add playlist or play songs *****
                        </div>}
                    <Box className="songs_container">
                        {lists.map((list, index) => {
                            return (<TabPanel key={list._id} value={value} index={index}>
                                {list.songs[0] ?
                                    <div className="list" id={index} >
                                        {list.songs.map((song, index) => {
                                            return <Song key={song.id} playlistId={list._id}
                                                value={value} song={song} index={index}
                                                removeSong={removeSong} playSong={playSong} />
                                        })}
                                    </div>
                                    : <div className="message">***** There is no songs yet *****</div>
                                }
                            </TabPanel>
                            )
                        })}
                        {lists[0] && <TabPanel value={value} index={lists.length}>
                            <div className="add_container">
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
                                        }}>
                                            <AddIcon className="add_playlist" fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                </form>
                            </div>
                        </TabPanel>}
                    </Box>
                </Box>
            </div>
        </Grid>
    )
}
export default SongList;