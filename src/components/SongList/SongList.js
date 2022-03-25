import './SongList.css'
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import Song from "../Song/Song";
import { useRef, useContext, useState } from "react";
import playlistIndexContext from "../../Contexts/playlistIndexContext";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';
import AddPlaylist from "../AddPlaylist/AddPlaylist";
import PlaylistsContext from '../../Contexts/PlaylistsContext';

const SongList = () => {
    const { playlists } = useContext(PlaylistsContext)
    const { setPlaylistIndex } = useContext(playlistIndexContext);
    const [playlistName, setPlaylistName] = useState("");
    const [value, setValue] = useState(0);
    const [isAddPlaylist, setIsAddPlaylist] = useState(false);
    const newPlaylistRef = useRef(null);
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
    const a11yProps = (index) => {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPlaylistIndex(newValue);
    }
    return (
        <Grid item xs={10} md={16}>
            <div className="SongList" >
                <Box className="playlists_container">
                    {playlists[0] && !isAddPlaylist ?
                        <Tabs className="title"
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            {playlists[0] && playlists.map((playlist, i) => {
                                return (
                                    <Tab key={playlist.title} label={playlist.title} {...a11yProps(i)} ></Tab>
                                )
                            })}
                            <Tab label='*add playlist*'{...a11yProps(playlists.l)}></Tab>
                        </Tabs>
                        : isAddPlaylist ?
                            <AddPlaylist
                                newPlaylistRef={newPlaylistRef}
                                playlistName={playlistName}
                                setPlaylistName={setPlaylistName}
                                setIsAddPlaylist={setIsAddPlaylist} />
                            : <div className="message">
                                *** ** There is no playlists to add to.
                                <span className="add-playlist-no-p"
                                    onClick={() => { setIsAddPlaylist(true) }}> Add playlist </span>
                                or play songs *****
                            </div>}
                    <Box className="songs_container">
                        {playlists.map((list, index) => {
                            return (<TabPanel key={list._id} value={value} index={index}>
                                {list.songs[0] ?
                                    <div className="list" id={index} >
                                        {list.songs.map((song, index) => {
                                            return <Song key={song.id} playlistId={list._id}
                                                song={song} />
                                        })}
                                    </div>
                                    : <div className="message">***** There is no songs yet *****</div>
                                }
                            </TabPanel>
                            )
                        })}
                        {playlists[0] && <TabPanel value={value} index={playlists.length}>
                            <AddPlaylist
                                newPlaylistRef={newPlaylistRef}
                                playlistName={playlistName}
                                setPlaylistName={setPlaylistName}
                            />
                        </TabPanel>}
                    </Box>
                </Box>
            </div>
        </Grid>
    )
}
export default SongList;