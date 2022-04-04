import { Search } from '@mui/icons-material'
import { IconButton, Input } from '@mui/material'
import { createTheme } from '@mui/system'
import { useContext, useEffect, useRef } from 'react'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import youtube from '../../apis/youtube'
import IsHomePageContext from '../../Contexts/IsHomePageContext'
import PlaylistsContext from '../../Contexts/PlaylistsContext'
import './ItemForm.css'

const ItemForm = ({ setResults }) => {
    const { playlists } = useContext(PlaylistsContext);
    const { isHomePage } = useContext(IsHomePageContext)
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    const searchSong = async (forSearch) => {
        const res = await youtube.get('/search', {
            params: {
                q: forSearch
            }
        })
        setResults(res.data.items);
        setValue("");
    }
    const searchPlaylist = (value) => {
        const results = playlists.filter(playlist => playlist.title.includes(value));
        console.log(results);
        setResults(results);
        setValue("");
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00cedc',
                contrastText: '#fff',
            },
            secondary: {
                main: '#00cedc',
                contrastText: '#fff',
            },
        },
    });


    useEffect(() => {
        inputRef.current.focus();
    })
    return <div className='ItemForm'>
        <ThemeProvider theme={theme}>
            <Input
                className='search_input'
                ref={inputRef}
                color="primary"
                id="search"
                label="Search"
                placeholder={isHomePage ? `Search Playlists` : `Search Songs`}
                name="search"
                autoComplete="search"
                onChange={(e) => { setValue(e.target.value) }}
                value={value}
            >
            </Input>

            <IconButton className='search_btn'
                onClick={(e) => {
                    e.preventDefault()
                    isHomePage ? searchPlaylist(value) : searchSong(value);
                }}><Search /></IconButton>


        </ThemeProvider>
    </div>

}
export default ItemForm;