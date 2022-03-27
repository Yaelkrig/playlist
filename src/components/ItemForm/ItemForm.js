import { Search } from '@mui/icons-material'
import { IconButton, Input } from '@mui/material'
import { createTheme } from '@mui/system'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import youtube from '../../apis/youtube'
import './ItemForm.css'

const ItemForm = ({ setResults }) => {
    const [value, setValue] = useState("")
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
            <form className="search_input">
                <Input
                    disableUnderline={true}
                    ref={inputRef}
                    color="primary"
                    id="search"
                    label="Search"
                    placeholder='Search'
                    name="search"
                    autoComplete="search"
                    onChange={(e) => { setValue(e.target.value) }}
                    value={value}
                >
                </Input>

                <IconButton className='search'
                    onClick={(e) => {
                        e.preventDefault()
                        searchSong(value)
                    }}><Search /></IconButton>
            </form>

        </ThemeProvider>
    </div>

}
export default ItemForm;